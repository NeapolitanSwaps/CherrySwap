pragma solidity ^0.5.12;

// Library & interfaces
import "@openzeppelin/contracts-ethereum-package/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/IERC20.sol";
import "./interface/ICERC20.sol";
// Contracts
import "@openzeppelin/upgrades/contracts/Initializable.sol";
import "./token/CherryDai.sol";

/**
 * @title Cherrypool Contract
 * @dev This contract handle Cherry Pool functionalities
 */
contract Cherrypool is Initializable {
    using SafeMath for uint256;

    uint256 public poolBalance; // total pool balance
    uint256 public longPoolBalance; // long pool balance in DAI
    uint256 public shortPoolBalance; // short pool balance in DAI
    uint256 public longPoolReserved; // amount of DAI reserved in the long pool
    uint256 public shortPoolReserved; // amount of DAI reserved in the short pool

    IERC20 public token; // collateral asset = DAI
    ICERC20 public cToken; // cDAI token
    CherryDai public cherryDai; // CherryDai token

    event DepositLiquidity(address indexed liquidityProvider, uint256 amount);
    event PoolShare(uint256 amount);
    event MintCherry(address indexed liquidityProvider, uint256 amount);
    event Transfer(address indexed to, uint256 value);

    /**
     * @dev Initialize contract states
     */
    function initialize(address _token, address _cToken) public initializer {
        token = IERC20(_token);
        cToken = ICERC20(_cToken);

        cherryDai = new CherryDai();
        cherryDai.initialize();

        poolBalance = 0;
        longPoolBalance = 0;
        shortPoolBalance = 0;
        longPoolReserved = 0;
        shortPoolReserved = 0;
    }

    /**
     * @dev at liquidity to the cherry pool to offer swaps against
     * @param _amount amount of deposited DAI
     */
    function mint(uint256 _amount) public {
        require(_amount > 0, "Cherrypool::amount provided should be higher");

        // collect liquidity from provider
        require(
            token.transferFrom(msg.sender, address(this), _amount),
            "Cherrypool::deposit liquidity failed"
        );

        // deposit liqudity into compound
        token.approve(address(cToken), _amount);
        assert(cToken.mint(_amount) == 0);

        // mint CherryDai to liqudity provider
        cherryDai.mint(msg.sender, _amount.mul(exchangeRate()));

        // internal accounting to store pool balances
        poolBalance.add(_amount);
        longPoolBalance.add(_amount.div(2));
        shortPoolBalance.add(_amount.div(2));

        emit DepositLiquidity(msg.sender, _amount);
        emit MintCherry(msg.sender, _amount);
    }

    /**
     * @dev Modifier to check if long pool is not fully utilized
     */
    modifier isLongUtilized() {
        require(
            calcLongPoolUtilization(longPoolReserved) < 1e18,
            "Cherrypool::long pool if fully utilized"
        );
        _;
    }

    /**
     * @dev Modifier to check if short pool is not fully utilized
     */
    modifier isShortUtilized() {
        require(
            calcShortPoolUtilization(shortPoolReserve) < 1e18,
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
     * @dev Get long pool utilization
     * @param _longPoolReserved amount of liquidity reserved in the long pool
     * @return current long pool utilization as a decimal scaled 10*18
     */

    function calcLongPoolUtilization(uint256 _longPoolReserved)
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
    function calcShortPoolUtilization(uint256 _shortPoolReserved)
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
     * @param _amount amount of CherryDai to redeem
     * @return 0 if successful otherwise an error code
     */
    function redeem(uint256 _amount)
        public
        isLongUtilized()
        isShortUtilized()
        returns (uint256)
    {
        require(
            _amount <= cherryDai.balanceOf(msg.sender),
            "CherryPool::redeem request is more than current token balance"
        );
    }

    /**
     * @dev the rate of CherryDai redeemable for Dai.
     * @notice Each CherryDai is convertible into the underlying asset + the fees accrued through liquidity provision.
     * @return 0 if successful otherwise an error code
     */
    function exchangeRate() public view returns (uint256) {
        return 1;
    }

    function _reserveLongPool(uint256 _amount) internal {
        require(_amount > 0, "Cherrypool::invalid amount to reserve");

        longPoolReserved.add(_amount);
    }

    function _reserveShortPool(uint256 _amount) internal {
        require(_amount > 0, "Cherrypool::invalid amount to reserve");

        shortPoolReserved.add(_amount);
    }

}
