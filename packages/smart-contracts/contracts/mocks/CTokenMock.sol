pragma solidity ^0.5.12;

import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20.sol";

contract CTokenMock is ERC20 {
    function mint(uint256 mintAmount) public returns (uint256) {
        _mint(msg.sender, mintAmount);
        return 0;
    }

    function redeem(uint256 redeemTokens) public returns (uint256) {
        uint256 senderBalance = balanceOf(msg.sender);
        transfer(msg.sender, senderBalance);
        return 0;
    }

    function supplyRatePerBlock() public pure returns (uint256) {
        return 28051049764;
    }

    function getCash() public pure returns (uint256) {
        return 6288595451279132189507771;
    }

    function totalReserves() public pure returns (uint256) {
        return 154054611553241099050750;
    }

    function totalSupply() public view returns (uint256) {
        return 98015033016839753;
    }

    function redeemUnderlying(uint256 redeemAmount) public returns (uint256) {
        return 0;
    }

    function exchangeRateCurrent() public view returns (uint256) {
        return 201256187943304079210508672;
    }
}
