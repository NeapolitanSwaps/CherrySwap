pragma solidity ^0.5.12;

interface ICERC20 {
    event Transfer(address indexed from, address indexed to, uint256 value);

    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );

    function balanceOf(address account) external view returns (uint256);

    function transfer(address recipient, uint256 amount)
        external
        returns (bool);

    function allowance(address owner, address spender)
        external
        view
        returns (uint256);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(address sender, address recipient, uint256 amount)
        external
        returns (bool);

    function mint(uint256 mintAmount) external returns (uint256);

    function redeem(uint256 redeemTokens) external returns (uint256);

    function redeemUnderlying(uint256 redeemAmount) external returns (uint256);

    function exchangeRateCurrent() external returns (uint256);

    function getCash() external returns (uint256);

    function supplyRatePerBlock() external returns (uint256);

    function totalReserve() external returns (uint256);

    function totalSupply() external returns (uint256);

    function totalBorrowsCurrent() external returns (uint256);

    function totalReserves() external returns (uint256);
}
