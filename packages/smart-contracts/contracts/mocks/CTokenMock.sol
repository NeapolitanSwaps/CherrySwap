pragma solidity ^0.5.0;

import "@openzeppelin/upgrades/contracts/Initializable.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20.sol";


contract CTokenMock is Initializable, ERC20 {
  
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
    return 29482138861;
  }

  function incrementSupplyRatePerBlock() public pure returns (uint) {
    uint current = supplyRatePerBlock();
    return current + 5760;
  }

  function decrementSupplyRatePerBlock() public pure returns (uint) {
    uint current = supplyRatePerBlock();
    return current - 5760;
  }
}
