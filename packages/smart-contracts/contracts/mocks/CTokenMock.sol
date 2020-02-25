pragma solidity ^0.5.12;

/**
* @title CToken Mock - simulating a compound marketplace.
* @dev This contract implements the required interfaces to mock compound markets
* while not providing all interfaces there. This mock is extremely simple and ignores
* many of the subtleties with the real compound contracts. For example the non-linear
* relationship between Dai deposited and cDai minted. Rather, this contract assumes
* the simplest linear relationship between variables to keep things as simple as possible.
* The values returned represent the expected state changes for each function for each token.
* The seeded values are the real values taken from compound on 24th Feb, 2020.
*/

import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20.sol";

contract CTokenMock is ERC20 {
    /**
     * @dev msg.sender account which shall supply the asset, and own the minted cTokens.
     * @param mintAmount : The amount of the asset to be supplied, in units of the underlying asset.
     * @return uint 256: 0 on success, otherwise an Error codes
    */
    constructor(address tokenAddress) public returns (uint256){}

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
