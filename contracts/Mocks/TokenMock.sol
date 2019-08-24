pragma solidity ^0.4.24;

import "../token/ERC20.sol";

contract TokenMock is ERC20 {
  constructor() public {
  }

  function mint(address _recepient, uint256 _supply) public {
    _mint(_recepient, _supply);
  }
}
