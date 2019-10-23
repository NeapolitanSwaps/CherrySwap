pragma solidity ^0.4.24;

import "../token/ERC20.sol";


contract CTokenMock is ERC20 {
  
  constructor() public {
  }

  function mint(uint mintAmount) public returns(uint256) {
    _mint(msg.sender, mintAmount);
    return 0;
  }

  function redeem(uint redeemTokens) public returns(uint256) {
    uint256 senderBalance = balanceOf(msg.sender);
    transfer(msg.sender, senderBalance);
    return 0;
  }

  function supplyRatePerBlock() public pure returns (uint) {
    return 56257237401;
  }

  function incrementSupplyRatePerBlock() public returns (uint) {
    uint current = supplyRatePerBlock();
    return current + 5760;
  }

  function decrementSupplyRatePerBlock() public returns (uint) {
    uint current = supplyRatePerBlock();
    return current - 5760;
  }
}
