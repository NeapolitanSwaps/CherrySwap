pragma solidity ^0.5.0;

import "@openzeppelin/upgrades/contracts/Initializable.sol";
import "./token/CherryDai.sol";

import "@openzeppelin/contracts-ethereum-package/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/IERC20.sol";
import "./interface/ICERC20.sol";

contract Cherrypool is Initializable {
    using SafeMath for uint256;

    uint256 public _poolBalance; // total pool balance
    uint256 public _longPoolBalance; // long pool balance in DAI
    uint256 public _shortPoolBalance; // short pool balance in DAI
    uint256 public _longPoolReserved; // amount of DAI reserved in the long pool
    uint256 public _shortPoolReserved; // amount of DAI reserved in the short pool

    mapping(address => uint256) public _providersBalances; // mapping for each liquidity provider with the deposited amount (do we need it?)

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

        _poolBalance = 0;
        _longPoolBalance = 0;
        _shortPoolBalance = 0;
        _longPoolReserved = 0;
        _shortPoolReserved = 0;
    }

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
        _poolBalance.add(_amount);
        _longPoolBalance.add(_amount.div(2));
        _shortPoolBalance.add(_amount.div(2));

        //allocate lequidity provision to sender
        _providersBalances[msg.sender].add(_amount);

        emit DepositLiquidity(msg.sender, _amount);
        emit MintCherry(msg.sender, _amount);
    }

    /**
    * @dev Get long pool utilization
    * @return current long pool utilization as a decimal scaled 10*18
    */
    function longPoolUtilization() public view returns (uint256) {
        return (_longPoolReserved * 1e18) / _longPoolBalance;
    }

    /**
    * @dev Get short pool utilization
    * @return current short pool utilization as a decimal scaled 10*18
    */
    function shortPoolUtilization() public view returns (uint256) {
        return (_shortPoolReserved * 1e18) / _shortPoolBalance;
    }
}
