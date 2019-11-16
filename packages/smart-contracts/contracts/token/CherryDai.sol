pragma solidity ^0.5.0;

import "@openzeppelin/upgrades/contracts/Initializable.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20Detailed.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20Mintable.sol";

contract CherryDai is Initializable, ERC20Detailed, ERC20Mintable {

  function initialize() public initializer {
    // need a better name & symbol for sure
    ERC20Detailed.initialize("Cherry Dai", "CHD", 18);

    ERC20Mintable.initialize(msg.sender);
  }

}