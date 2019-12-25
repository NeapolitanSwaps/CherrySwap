pragma solidity ^0.5.12;

interface ICERC20 {

    event Transfer(address indexed from, address indexed to, uint256 value);

    event Approval(address indexed owner, address indexed spender, uint256 value);

    function balanceOf(address account) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external returns (bool);

    function allowance(address owner, address spender) external view returns (uint256);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

    function mint(uint mintAmount) external returns (uint);

    function redeem(uint redeemTokens) external returns (uint);

    function redeemUnderlying(uint redeemAmount) external returns (uint);

    function exchangeRateCurrent() external returns (uint256);

    function getCash() external returns (uint);

    function supplyRatePerBlock() external returns (uint);

    function totalReserve() external returns (uint);

    function totalSupply() external returns (uint);

    function totalBorrowsCurrent() external returns (uint);

    function totalReserves() external returns (uint);
}