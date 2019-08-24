pragma solidity ^0.5.0;

import './ISwapMath.sol';
contract SolidityTest {
ISwapMath public swapMath;
    constructor(address swapMathAddress) public{
       swapMath = ISwapMath(swapMathAddress);
    }
    
    function get() public view returns (uint256) {
        return 11;
    }

    function getVyper() public returns (uint256) {
        return swapMath.getnum();
    }
}