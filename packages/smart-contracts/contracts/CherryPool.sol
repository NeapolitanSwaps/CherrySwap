pragma solidity ^0.5.12;

// Library & interfaces
import "@openzeppelin/contracts-ethereum-package/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/IERC20.sol";
import "./interface/ICERC20.sol";
// Contracts
import "@openzeppelin/upgrades/contracts/Initializable.sol";
import "./token/CherryDai.sol";
import "./CherryMath.sol";
import "./ErrorReporter.sol";

/**
 * @title CherryPool Contract
 * @dev This contract handle Cherry Pool functionalities
 */
contract CherryPool is Initializable, TokenErrorReporter {
    using SafeMath for uint256;

    uint256 public poolBalance; // total pool balance in DAI
    uint256 public longPoolBalance; // long pool balance in DAI
    uint256 public shortPoolBalance; // short pool balance in DAI
    uint256 public longPoolReserved; // amount of DAI reserved in the long pool
    uint256 public shortPoolReserved; // amount of DAI reserved in the short pool
    int256 public poolcTokenProfit; //the total net profit the pool has made (or lost) during it life

    IERC20 public token; // collateral asset = DAI
    ICERC20 public cToken; // cDAI token
    CherryDai public cherryDai; // CherryDai token

    CherryMath cherryMath;  // Math library

    struct RedeemLocalVars {
        Error err;
        CherryMath.MathError mathErr;
        uint exchangeRateMantissa;
        uint redeemTokens;
        uint redeemAmount;
        uint totalSupplyNew;
        uint accountTokensNew;
    }

    event DepositLiquidity(address indexed liquidityProvider, uint256 amount);
    event PoolShare(uint256 amount);
    event MintCherry(address indexed liquidityProvider, uint256 amount);
    event RedeemCherry(address indexed liquidityProvider, uint256 redeemAmount, uint256 redeemToken);
    event Transfer(address indexed to, uint256 value);
    event CurrentExchangeRate(uint256 rate);

    /**
     * @dev Initialize contract states
     */
    function initialize(address _token, address _cToken, address _cherryMath) public initializer {
        token = IERC20(_token);
        cToken = ICERC20(_cToken);

        cherryDai = new CherryDai();
        cherryDai.initialize();

        cherryMath = CherryMath(_cherryMath);

        poolBalance = 0;
        longPoolBalance = 0;
        shortPoolBalance = 0;
        longPoolReserved = 0;
        shortPoolReserved = 0;
    }

    /**
     * @dev Modifier to check if long pool is not fully utilized
     */
    modifier isLongUtilized() {
        require(
            calcLongPoolUtil(longPoolReserved) < 1e18,
            "Cherrypool::long pool if fully utilized"
        );
        _;
    }

    /**
     * @dev Modifier to check if short pool is not fully utilized
     */
    modifier isShortUtilized() {
        require(
            calcShortPoolUtil(shortPoolReserved) < 1e18,
            "Cherrypool::short pool is fully utilized"
        );
        _;
    }

    modifier canReserveLong(uint256 _amount) {
        require(
            longPoolReserved.add(_amount) <= longPoolBalance,
            "Cherrypool::long pool does not have liquidity"
        );
        _;
    }

    modifier canReserveShort(uint256 _amount) {
        require(
            shortPoolReserved.add(_amount) <= shortPoolBalance,
            "Cherrypool::short pool does not have liquidity"
        );
        _;
    }

    /**
     * @dev at liquidity to the cherry pool to offer swaps against
     * @param _amount amount of deposited DAI
     * @return uint 0=success, otherwise a failure (see ErrorReporter.sol for details)
     */
    function mint(uint256 _amount) public returns (uint) {
        require(_amount > 0, "Cherrypool::amount provided should be higher");

        // collect liquidity from provider
        require(
            token.transferFrom(msg.sender, address(this), _amount),
            "Cherrypool::deposit liquidity failed"
        );

        // deposit liqudity into compound
        token.approve(address(cToken), _amount);
        assert(cToken.mint(_amount) == 0);

        CherryMath.MathError _err;
        uint256 _rate;
        (_err, _rate) = exchangeRate();
        if (_err != CherryMath.MathError.NO_ERROR) {
            return failOpaque(Error.MATH_ERROR, FailureInfo.REDEEM_EXCHANGE_RATE_READ_FAILED, uint(_err));
        }

        // mint CherryDai to liqudity provider
        cherryDai.mint(msg.sender, _amount.mul(_rate));

        // internal accounting to store pool balances
        poolBalance = poolBalance.add(_amount);
        longPoolBalance = longPoolBalance.add(_amount.div(2));
        shortPoolBalance = shortPoolBalance.add(_amount.div(2));

        emit DepositLiquidity(msg.sender, _amount);
        emit MintCherry(msg.sender, _amount);
    }

    /**
     * @dev Get long pool utilization
     * @param _longPoolReserved amount of liquidity reserved in the long pool
     * @return current long pool utilization as a decimal scaled 10*18
     */

    function calcLongPoolUtil(uint256 _longPoolReserved)
        public
        view
        returns (uint256)
    {
        return (_longPoolReserved * 1e18) / longPoolBalance;
    }

    /**
     * @dev Get short pool utilization
     * @param _shortPoolReserved amount of liquidity reserved in the short pool
     * @return current short pool utilization as a decimal scaled 10*18
     */
    function calcShortPoolUtil(uint256 _shortPoolReserved)
        public
        view
        returns (uint256)
    {
        return (_shortPoolReserved * 1e18) / shortPoolBalance;
    }

    /**
     * @dev Get Cherrydai balance for liquidity provider
     * @param _provider liquidity provider address
     * @return CherryDai balance
     */
    function cherryDaiBalanceOf(address _provider)
        public
        view
        returns (uint256)
    {
        return cherryDai.balanceOf(_provider);
    }

    /**
     * @dev transfer underlying asset back to liquidity provider assuming liquidity is still sufficient.
     * @notice the amount returned is the number of cherrytokens multiplied by the current exchange rate
     * The sender should approve the _amount to this contract address
     * @param _amount amount of CherryDai to redeem
     * @return 0 if successful otherwise an error code
     */
    function redeem(uint256 _amount)
        public
        isLongUtilized()
        isShortUtilized()
        returns (uint)
    {
        require(
            _amount <= cherryDai.balanceOf(msg.sender),
            "CherryPool::redeem request is more than current token balance"
        );

        RedeemLocalVars memory vars;

        // get exchange rate from Cherrydai to Dai+fee
        (vars.mathErr, vars.exchangeRateMantissa) = exchangeRate();

        if (vars.mathErr != CherryMath.MathError.NO_ERROR) {
            return failOpaque(Error.MATH_ERROR, FailureInfo.REDEEM_EXCHANGE_RATE_READ_FAILED, uint(vars.mathErr));
        }

        vars.redeemTokens = _amount;

        // Calculate the amount of Dai to get(redeemAmount) from redeeming CherryDai(redeemTokens)
        (vars.mathErr, vars.redeemAmount) = cherryMath.mulScalarTruncate(vars.exchangeRateMantissa, vars.redeemTokens);
        if (vars.mathErr != CherryMath.MathError.NO_ERROR) {
            return failOpaque(Error.MATH_ERROR, FailureInfo.REDEEM_EXCHANGE_TOKENS_CALCULATION_FAILED, uint(vars.mathErr));
        }

        /* Fail gracefully if pool has insufficient cash */
        if (getCashPrior() < vars.redeemAmount) {
            return fail(Error.TOKEN_INSUFFICIENT_CASH, FailureInfo.REDEEM_TRANSFER_OUT_NOT_POSSIBLE);
        }

        payout(msg.sender, vars.redeemAmount, vars.redeemTokens);
        //require(vars.err == Error.NO_ERROR, "redeem transfer out failed");

        emit RedeemCherry(msg.sender, vars.redeemAmount, vars.redeemTokens);

        return uint(Error.NO_ERROR);

    }

    /**
     * @dev Get available pool balance (total pool balance - total reserved balance)
     * @return available pool balance
     * @return 0 if successful otherwise an error code
     */
    function getCashPrior() internal returns (uint256) {
        return poolBalance - (shortPoolReserved + longPoolReserved);
    }

    function payout(address _redeemer, uint256 _redeemAmount, uint256 _redeemTokens) internal returns (Error) {
        cherryDai.burnFrom(_redeemer, _redeemTokens);
        
        // redeem an amount of underlying
        require(
            cToken.redeemUnderlying(_redeemAmount) == 0,
            "CherryPool::payout - something went wrong"
        );

        // transfer Dai to redeemer
        token.transfer(_redeemer, _redeemAmount);
    }

    /**
     * @dev the rate of CherryDai redeemable for Dai.
     * @notice Each CherryDai is convertible into the underlying asset + the fees accrued through liquidity provision.
     * @return 0 if successful otherwise an error code
     */
    function exchangeRate() public returns (CherryMath.MathError, uint256) {
        int256 rate = int256(getcTokenExchangeRate() / 1e10); //+ (poolcTokenProfit * 1e18) / int256(cherryDai.totalSupply());

        emit CurrentExchangeRate(uint256(rate));

        return (CherryMath.MathError.NO_ERROR, uint256(rate));
    }
    
    function _reserveLongPool(uint256 _amount) internal canReserveLong(_amount) {
        require(_amount > 0, "Cherrypool::invalid amount to reserve");

        longPoolReserved = longPoolReserved.add(_amount);
    }

    function _reserveShortPool(uint256 _amount) internal canReserveShort(_amount) {
        require(_amount > 0, "Cherrypool::invalid amount to reserve");

        shortPoolReserved = shortPoolReserved.add(_amount);
    }

    function _freeLongPool(uint256 _amount) internal {
        require(_amount > 0, "Cherrypool::invalid amount to free");
        longPoolReserved.sub(_amount);
    }

    function _freeShortPool(uint256 _amount) internal {
        require(_amount > 0, "Cherrypool::invalid amount to free");
        shortPoolReserved.sub(_amount);
    }

    function _addcTokenPoolProfit(int256 _profit) internal {
        poolcTokenProfit += _profit;
    }

    function getcTokenExchangeRate() public returns (uint256) {
        /*return
            (cToken.getCash() +
                cToken.totalBorrowsCurrent() -
                cToken.totalReserves()) /
            cToken.totalSupply();*/

        return cToken.exchangeRateCurrent();
    }

}
