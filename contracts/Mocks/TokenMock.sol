pragma solidity ^0.4.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TokenMock is ERC20 {
  constructor(uint256 supply) public {
  }

  function mint(address _recepient, uint256 _supply) public {
    _mint(_recepient, _supply);
  }
}
