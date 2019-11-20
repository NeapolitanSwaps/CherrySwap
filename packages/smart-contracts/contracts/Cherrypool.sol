pragma solidity ^0.5.0;

import "@openzeppelin/upgrades/contracts/Initializable.sol";
import "./token/CherryDai.sol";

import "@openzeppelin/contracts-ethereum-package/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/IERC20.sol";
import "./interface/ICERC20.sol";

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

    enum Bet {Long, Short}

    struct Swap {
        address owner;
        uint256 swapId;
        uint256 openingTime;
        uint256 endingTime;
        uint256 fixedRate;
        uint256 depositedValue;
        Bet bet;
    }

    Swap[] public swaps;

    /**
    @dev Initialize contract states
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
    @dev at liquidity to the cherry pool to offer swaps against.
    */    
    function mint(uint256 _amount) public {
        require(_amount > 0, "Cherrypool: amount provided should be higher");

        // collect liquidity from provider
        require(
            token.transferFrom(msg.sender, address(this), _amount),
            "Cherrypool: deposit liquidity failed"
        );

        // deposit liqudity into compound
        token.approve(address(cToken), _amount);
        assert(cToken.mint(_amount) == 0);

        // mint CherryDai to liqudity provider
        cherryDai.mint(msg.sender, _amount);

        // internal accounting to store pool balances
        poolBalance.add(_amount);
        longPoolBalance.add(_amount.div(2));
        shortPoolBalance.add(_amount.div(2));

        emit DepositLiquidity(msg.sender, _amount);
        emit MintCherry(msg.sender, _amount);
    }

    /**
    * @dev Get long pool utilization
    * @return current long pool utilization as a decimal scaled 10*18
    */
    function longPoolUtilization() public view returns (uint256) {
        return (longPoolReserved * 1e18) / longPoolBalance;
    }

    /**
    @dev Get short pool utilization
    @return current short pool utilization as a decimal scaled 10*18
    */
    function shortPoolUtilization() public view returns (uint256) {
        return (shortPoolReserved * 1e18) / shortPoolBalance;
    }

    /**
    @dev transfer underlying asset back to liquidity provider assuming liquidity is still sufficient.
    the amount returned is the number of cherrytokens multiplied by the current exchange rate
    @return 0 if successful otherwise an error code
    */
    function redeem(uint256 _amount) public returns (uint256){
        return 0;
    }
    
    /**
    @dev Each CherryDai is convertible into the underlying asset + 
    the fees accrued through liquidity provision
    @return 0 if successful otherwise an error code
    */
    function exchangeRate() public view returns (uint256) {

    }

    /**
    @dev function called by trader to enter into swap position.
    requires to check the current pool direction's utilization. If utilization is
    safe then position is entered.
    @return 0 if successful otherwise an error code
    */
    function createPosition(uint256 _amount, uint8 bet) public returns (uint256) {
        return 0;
    }

    /**
    @dev traded withdraw from their position.
    if the time is after the end of the swap then they will receive the swap rate for
    the duration of the swap and then the floating market rate between the end of the
    swap and the current time.
    */
    function closePosition(uint256 _swapId) public  returns (uint256) {
        return 0;
    }
}
