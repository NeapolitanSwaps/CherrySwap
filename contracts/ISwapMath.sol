pragma solidity ^0.4.24;

contract ISwapMath {
    function computeRatios(
        uint256 poolLong,
        uint256 poolShort,
        uint256 fixedRate,
        uint256 t1,
        uint256 t2,
        uint256 poolEnd
        ) public pure returns(int128, int128);
}