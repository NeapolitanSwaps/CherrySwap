pragma solidity ^0.5.12;

interface ISwapMath {
    function computeRatios(
        uint256 poolLong,
        uint256 poolShort,
        uint256 fixedRate,
        uint256 t1,
        uint256 t2,
        uint256 poolEnd
    ) external pure returns (int128, int128);
}
