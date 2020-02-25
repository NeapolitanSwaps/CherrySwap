pragma solidity ^0.5.12;

/**
* @title CToken Mock - simulating a compound market.
* @dev This contract implements the required interfaces to mock compound markets
* while not providing all interfaces there. This mock is extremely simple and ignores
* many of the subtleties with the real compound contracts. For example the non-linear
* relationship between Dai deposited and cDai minted. Rather, this contract assumes
* the simplest linear relationship between variables to keep things as simple as possible.
* The values returned represent the expected state changes for each function for each token.

*/

import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20.sol";

contract CTokenMock is ERC20 {
    /**
     * @dev msg.sender account which shall supply the asset, and own the minted cTokens.
     * @param mintAmount : The amount of the asset to be supplied, in units of the underlying asset.
     * @return uint 256: 0 on success, otherwise an Error codes
    */

    IERC20 public token; // collateral asset = DAI
    uint256 public supplyRatePerBlock = 0;
    uint256 public getCash = 0;
    uint256 public totalReserves = 0;
    uint256 public exchangeRateCurrent = 0;
    uint256 public totalSupply = 0;

    constructor(address tokenAddress) {
        token = IERC20(tokenAddress);
        _mint(address(this))
    }

    function mint(uint256 mintAmount) public returns (uint256) {
        _mint(msg.sender, mintAmount);
        return 0;
    }

    function redeem(uint256 redeemTokens) public returns (uint256) {
        uint256 senderBalance = balanceOf(msg.sender);
        transfer(msg.sender, senderBalance);
        return 0;
    }

    function supplyRatePerBlock(uint256 _supplyRatePerBlock) public pure returns (uint256) {
        supplyRatePerBlock = _supplyRatePerBlock;
    }

    function setGetCash(uint256 _getCash) public pure returns (uint256) {
        getCash = _getCash;
    }

    function setTotalReserves(uint256 _setTotalReserves) public pure returns (uint256) {
        totalReserves;
    }


    function redeemUnderlying(uint256 redeemAmount) public returns (uint256) {
        return 0;
    }

    function setExchangeRateCurrent(uint256 _exchangeRateCurrent) public returns (uint256) {
        exchangeRateCurrent = _exchangeRateCurrent;
    }
}
