pragma solidity ^0.5.0;

import "@openzeppelin/upgrades/contracts/Initializable.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20.sol";


contract TokenMock is Initializable, ERC20 {

  function mint(address _recepient, uint256 _supply) public {
    _mint(_recepient, _supply);
  }
}
