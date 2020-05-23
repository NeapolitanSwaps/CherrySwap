# ICERC20.sol

View Source: [contracts/interface/ICERC20.sol](../../smart-contracts/contracts/interface/ICERC20.sol)

**ICERC20**

**Events**

```js
event Transfer(address indexed from, address indexed to, uint256  value);
event Approval(address indexed owner, address indexed spender, uint256  value);
```

## Functions

- [balanceOf(address account)](#balanceof)
- [transfer(address recipient, uint256 amount)](#transfer)
- [allowance(address owner, address spender)](#allowance)
- [approve(address spender, uint256 amount)](#approve)
- [transferFrom(address sender, address recipient, uint256 amount)](#transferfrom)
- [mint(uint256 mintAmount)](#mint)
- [redeem(uint256 redeemTokens)](#redeem)
- [redeemUnderlying(uint256 redeemAmount)](#redeemunderlying)
- [exchangeRateStored()](#exchangeratestored)
- [getCash()](#getcash)
- [supplyRatePerBlock()](#supplyrateperblock)
- [totalReserve()](#totalreserve)
- [totalSupply()](#totalsupply)
- [totalBorrowsCurrent()](#totalborrowscurrent)
- [totalReserves()](#totalreserves)

### balanceOf

```js
function balanceOf(address account) external view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| account | address |  | 

### transfer

```js
function transfer(address recipient, uint256 amount) external nonpayable
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| recipient | address |  | 
| amount | uint256 |  | 

### allowance

```js
function allowance(address owner, address spender) external view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| owner | address |  | 
| spender | address |  | 

### approve

```js
function approve(address spender, uint256 amount) external nonpayable
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| spender | address |  | 
| amount | uint256 |  | 

### transferFrom

```js
function transferFrom(address sender, address recipient, uint256 amount) external nonpayable
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| sender | address |  | 
| recipient | address |  | 
| amount | uint256 |  | 

### mint

```js
function mint(uint256 mintAmount) external nonpayable
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| mintAmount | uint256 |  | 

### redeem

```js
function redeem(uint256 redeemTokens) external nonpayable
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| redeemTokens | uint256 |  | 

### redeemUnderlying

```js
function redeemUnderlying(uint256 redeemAmount) external nonpayable
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| redeemAmount | uint256 |  | 

### exchangeRateStored

```js
function exchangeRateStored() external view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### getCash

```js
function getCash() external nonpayable
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### supplyRatePerBlock

```js
function supplyRatePerBlock() external nonpayable
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### totalReserve

```js
function totalReserve() external nonpayable
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### totalSupply

```js
function totalSupply() external nonpayable
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### totalBorrowsCurrent

```js
function totalBorrowsCurrent() external nonpayable
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### totalReserves

```js
function totalReserves() external nonpayable
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

## Contracts

* [CherryDai](CherryDai.md)
* [CherryMath](CherryMath.md)
* [CherryPool](CherryPool.md)
* [CherrySwap](CherrySwap.md)
* [Context](Context.md)
* [CTokenMock](CTokenMock.md)
* [ERC20](ERC20.md)
* [ERC20Burnable](ERC20Burnable.md)
* [ERC20Detailed](ERC20Detailed.md)
* [ERC20Mintable](ERC20Mintable.md)
* [ICERC20](ICERC20.md)
* [IERC20](IERC20.md)
* [Initializable](Initializable.md)
* [ISwapMath](ISwapMath.md)
* [Migrations](Migrations.md)
* [MinterRole](MinterRole.md)
* [Roles](Roles.md)
* [SafeMath](SafeMath.md)
* [TokenMock](TokenMock.md)
