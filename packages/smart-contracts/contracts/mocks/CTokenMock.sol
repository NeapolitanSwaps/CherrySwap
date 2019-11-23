pragma solidity ^0.5.12;

import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20.sol";


contract CTokenMock is ERC20 {
  
  function mint(uint mintAmount) public returns(uint) {
    _mint(msg.sender, mintAmount);
    return 0;
  }

  function redeem(uint redeemTokens) public returns(uint) {
    uint senderBalance = balanceOf(msg.sender);
    transfer(msg.sender, senderBalance);
    return 0;
  }

  function supplyRatePerBlock() public pure returns (uint) {
    return 24206647178;
  }

  function getCash() public pure returns (uint256) {
    return 12191772623652836238229233;
  } 

  function totalReserve() public pure returns (uint256) {
    return 123569305920595200177091;
  }

  function totalReserves() public pure returns (uint256) {
    return 123569305920595200177091;
  }

  function totalSupply() public pure returns (uint256) {
    return 112835765547222288;
  }
}
