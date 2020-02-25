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

    IERC20 public token; // collateral asset = DAI
    uint256 public supplyRatePerBlock = 70966375099;
    uint256 public getCash = 534377765362123926612;
    uint256 public totalReserves = 223837001939965599401;
    uint256 public totalSupply = 740604290907233;
    uint256 public exchangeRateCurrent = 207647402721868971577224657;

    constructor(address tokenAddress) {
        owner = msg.sender;
        token = IERC20(_token);
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
        supplyRatePerBlock =_supplyRatePerBlock;
    }

    function setGetCash(uint256 _getCash) public pure returns (uint256) {
        getCash = _getCash;
    }

    function setTotalReserves(uint256 _setTotalReserves) public pure returns (uint256) {
        setTotalReserves = _setTotalReserves;
    }

    function setTotalSupply(uint256 _totalSupply) public view returns (uint256) {
        totalSupply = _totalSupply;
    }

    function redeemUnderlying(uint256 redeemAmount) public returns (uint256) {
        return 0;
    }

    function setExchangeRateCurrent() public view returns (uint256) {
        return 207647402721868971577224657;
    }
}
