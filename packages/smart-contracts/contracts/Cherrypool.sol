pragma solidity ^0.5.0;

import "@openzeppelin/upgrades/contracts/Initializable.sol";
import "./token/CherryDai.sol";

import "@openzeppelin/contracts-ethereum-package/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/IERC20.sol";
import "./interface/ICERC20.sol";

contract Cherrypool is Initializable {

  using SafeMath for uint256;

  uint256 constant public DECIMALS = 10**18;

  uint256 private _poolBalance;                           // total pool balance
  uint256 private _longPoolBalance;                       // long pool balance
  uint256 private _shortPoolBalance;                      // short pool balance
  uint256 private _longPoolUtilization;                   // long pool utilization  0->1*DECIMALS
  uint256 private _shortPoolUtilization;                  // short pool utilization 0->1*DECIMALS
  uint256 private _longPoolReserved;                      // amount of DAI reserved in the long pool
  uint256 private _shortPoolReserved;                     // amount of DAI reserved in the short pool

  mapping(address => uint256) private _providersBalances;  // mapping for each liquidity provider with the deposited amount (do we need it?)

  IERC20 public token;                                    // collateral asset = DAI
  ICERC20 public cToken;                                  // cDAI token
  CherryDai public cherryDai;                             // CherryDai token

  event DepositLiquidity(address indexed liquidityProvider, uint256 amount);
  event PoolShare(uint256 amount);
  event MintCherry(address indexed liquidityProvider, uint256 amount);
  event Transfer(address indexed to, uint256 value);

  /**
   * @dev Initialize contract states
   * @notice Cherrypool deploy CherryDai and therefore CherryDai is not upgradeable (we can change that)
   */
  function initialize(
    address _token,
    address _cToken
  ) public initializer {
    token = IERC20(_token);
    cToken = ICERC20(_cToken);
    cherryDai = new CherryDai();

    _longPoolUtilization = 0;
    _longPoolReserved = 0;
    _shortPoolUtilization = 0;
    _shortPoolReserved = 0;
  }

  function deposit(
    uint256 _amount
  ) public {
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

    _poolBalance = _amount;
    _providersBalances[msg.sender].add(_amount);
    
    uint256 poolShare = _poolBalance.div(2);
    _longPoolBalance = poolShare;
    _shortPoolBalance = poolShare;

    updateLongPoolUtilization(_longPoolReserved);
    updateShortPoolUtilization(_shortPoolReserved);

    emit DepositLiquidity(msg.sender, _amount);
    emit MintCherry(msg.sender, _amount);
    emit PoolShare(poolShare);
  }

  function updateLongPoolUtilization(uint256 totalReservedLong) internal {
    // this function should update the utilization % in the long pool
    // should be called whenver a provider deposit liquidity or when a trader go long
  }

  function updateShortPoolUtilization(uint256 totalReservedShort) internal {
    // this function should update the utilization % in the short pool
    // should be called whenver a provider deposit liquidity or when a trader go short
  }

  /**
   * @dev Get pool balance
   * @return Total pool balance
   */
  function poolBalance() public view returns(uint256) {
    return _poolBalance;
  }

  /**
   * @dev Get long pool balance
   * @return long pool balance
   */
  function longPoolBalance() public view returns(uint256) {
    return _longPoolBalance;
  }

  /**
   * @dev Get long pool utilisation
   * @return Long pool utilization
   */
  function longPoolUtilization() public view returns(uint256) {
    return _longPoolUtilization;
  }

  /**
   * @dev Get reserved long pool
   * @return Amount reserved for traders in the long pool
   */
  function longPoolReserved() public view returns(uint256) {
    return _longPoolReserved;
  }

  /**
   * @dev Get short pool balance
   * @return Short pool balance
   */
  function shortPoolBalance() public view returns(uint256) {
    return _shortPoolBalance;
  }

  /**
   * @dev Get short pool utilisation
   * @return Short pool utilization
   */
  function shortPoolUtilization() public view returns(uint256) {
    return _shortPoolUtilization;
  }

  /**
   * @dev Get reserved short pool
   * @return Amount reserved for traders in the short pool
   */
  function shortPoolReserved() public view returns(uint256) {
    return _shortPoolReserved;
  }

}