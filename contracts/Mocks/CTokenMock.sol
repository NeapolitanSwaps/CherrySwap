pragma solidity ^0.4.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
//import "../interface/IERC20.sol";
//import "./TokenMock.sol";

contract CTokenMock is ERC20 {
  
  mapping(address => uint256) public moneyMarket;

  constructor(address _ERC20Token) public {
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

  function supplyRatePerBlock() public returns (uint) {
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
