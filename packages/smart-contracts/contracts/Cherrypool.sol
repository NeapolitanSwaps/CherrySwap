pragma solidity ^0.5.0;

import "@openzeppelin/upgrades/contracts/Initializable.sol";
import "./token/CherryDai.sol";

import "@openzeppelin/contracts-ethereum-package/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/IERC20.sol";
import "./interface/ICERC20.sol";

contract Cherrypool is Initializable {

  using SafeMath for uint256;

  uint256 constant public DECIMALS = 10**3;

  uint256 private _poolBalance;                         // total pool balance
  uint256 private _longPoolBalance;                     // long pool balance
  uint256 private _shortPoolBalance;                    // short pool balance
  uint256 private _poolUtilization;                     // total pool utilization 0->1*DECIMALS = 100%
  uint256 private _longPoolUtilization;                 // long pool utilization  0->1*DECIMALS = 100%
  uint256 private _shortPoolUtilization;                // short pool utilization 0->1*DECIMALS = 100%

  IERC20 public token;                                  // collateral asset = DAI
  ICERC20 public cToken;                                // cDAI token
  CherryDai public cherryDai;                           // CherryDai token

  event DepositLiquidity(address indexed liquidityProvider, uint256);
  event Transfer(address indexed to, uint256 value);

  /**
   * @dev Initialize contract states
   * @notice Cherrypool deploy CherryDai and therefore CherryDai is not upgradeable (we can change that)
   */
  function initialize() public initializer {
    cherryDai = new CherryDai();

    _poolUtilization = 0;
    _longPoolUtilization = 0;
    _shortPoolUtilization = 0;
  }

  /**
   * @dev Get pool balance
   * @return Total pool balance
   */
  function poolBalance() public view returns(uint256) {
    return _poolBalance;
  }

  /**
   * @dev Get pool utilisation
   * @return Total pool utilization
   */
  function poolUtilization() public view returns(uint256) {
    return _poolUtilization;
  }

  /**
   * @dev Get long pool balance
   * @return long pool balance
   */
  function longPoolBalance() public view returns(uint256) {
    return _longPoolBalance;
  }

  /**
   * @dev Get pool utilisation
   * @return Total pool utilization
   */
  function longPoolUtilization() public view returns(uint256) {
    return _longPoolUtilization;
  }

  /**
   * @dev Get short pool balance
   * @return Short pool balance
   */
  function shortPoolBalance() public view returns(uint256) {
    return _shortPoolBalance;
  }

  /**
   * @dev Get pool utilisation
   * @return Total pool utilization
   */
  function shortPoolUtilization() public view returns(uint256) {
    return _shortPoolUtilization;
  }

}