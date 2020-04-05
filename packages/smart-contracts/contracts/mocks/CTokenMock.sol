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

import "@openzeppelin/upgrades/contracts/Initializable.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20.sol";


contract CTokenMock is Initializable, ERC20 {
    // collateral asset = DAI
    IERC20 public token;

    // Internal counters
    uint256 public supplyRatePerBlock;
    uint256 public getCash;
    uint256 public totalReserves;
    uint256 public exchangeRateStored;

    function initialize(address tokenAddress) public initializer {
        token = IERC20(tokenAddress);

        supplyRatePerBlock = 0;
        getCash = 0;
        totalReserves = 0;
        exchangeRateStored = 0;
    }

    // Feed in initial values to seed the compound market.
    function seed(
        uint256 _supplyRatePerBlock,
        uint256 _getCash,
        uint256 _totalReserves,
        uint256 _exchangeRateStored,
        uint256 _totalSupply,
        address mintRecipient
    ) public {
        supplyRatePerBlock = _supplyRatePerBlock;
        getCash = _getCash;
        totalReserves = _totalReserves;
        exchangeRateStored = _exchangeRateStored;
        _mint(mintRecipient, _totalSupply);
    }

    /**
    * @dev msg.sender account which shall supply the asset, and own the minted cTokens.
    * @param mintAmount : The amount of the asset to be supplied, in units of the underlying asset.
    * @return uint 256: 0 on success, otherwise an Error codes
    */
    function mint(uint256 mintAmount) public returns (uint256) {
        // get amount of cToken to mint
        // mintTokens = mintAmount / exchangeRate
        uint256 numerator = mintAmount.mul(1e18);
        uint256 scaledNumerator = numerator.mul(1e18);
        uint256 rational = scaledNumerator.div(exchangeRateStored);

        _mint(msg.sender, rational.div(1e18));
        return 0;
    }

    function redeem(uint256 redeemTokens) public returns (uint256) {
        uint256 senderBalance = balanceOf(msg.sender);
        transfer(msg.sender, senderBalance);
        return 0;
    }

    function redeemUnderlying(uint256 redeemAmount) public returns (uint256) {
        return 0;
    }

    function setSupplyRatePerBlock(uint256 _supplyRatePerBlock) public {
        supplyRatePerBlock = _supplyRatePerBlock;
    }

    function setGetCash(uint256 _getCash) public {
        getCash = _getCash;
    }

    function setTotalReserves(uint256 _setTotalReserves) public {
        totalReserves = _setTotalReserves;
    }

    function setexchangeRateStored(uint256 _exchangeRateStored) public {
        exchangeRateStored = _exchangeRateStored;
    }
}
