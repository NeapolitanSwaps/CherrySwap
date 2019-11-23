pragma solidity ^0.5.12;
<<<<<<< HEAD

import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20.sol";
=======
>>>>>>> 6d7f276c1247f6f7c096dd66daee4209867e9cc0

interface ICERC20 is ERC20 {
    // CTOKEN functions

    function mint(uint mintAmount) external returns (uint);

    function redeem(uint redeemTokens) external returns (uint);

    function redeemUnderlying(uint redeemAmount) external returns (uint);

    function exchangeRateCurrent() external returns (uint);

    function getCash() external returns (uint);

    function supplyRatePerBlock() external returns (uint);

}
