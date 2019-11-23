pragma solidity ^0.5.12;

// Library & interfaces
import "./interface/ICERC20.sol";
import "./interface/ISwapMath.sol";
// Contracts
import "@openzeppelin/upgrades/contracts/Initializable.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20.sol";
import "./Cherrypool.sol";

/**
 * @title Cherryswap Contract
 * @dev This contract handle all swaping operations
 */
contract Cherryswap is Initializable, Cherrypool {

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
     * @dev Initialize contract states
     */
  function initialize(address _token, address _cToken) public initializer {
    require(
      (_token != address(0)) && (_cToken != address(0)),
      "Cherryswap::invalid tokens addresses"
    );

    Cherrypool.initialize(_token, _cToken);
  }

  /**
     * @dev function called by trader to enter into swap position.
     * @notice requires to check the current pool direction's utilization. If utilization is safe then position is entered.
     * @return 0 if successful otherwise an error code
     */
  function createPosition(uint256 _amount, uint8 bet) public returns (uint256) {
    return 0;
  }

  /**
     * @dev traded withdraw from their position.
     * @notice if the time is after the end of the swap then they will receive the swap rate for
     * the duration of the swap and then the floating market rate between the end of the
     * swap and the current time.
     */
  function closePosition(uint256 _swapId) public returns (uint256) {
    return 0;
  }

  function reserveLongPool(uint256 _amount) public {
    _reserveLongPool(_amount);
  }

}
