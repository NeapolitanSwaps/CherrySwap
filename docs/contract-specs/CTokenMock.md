# CTokenMock.sol

View Source: [contracts/mocks/CTokenMock.sol](../../packages/smart-contracts/contracts/mocks/CTokenMock.sol)

**↗ Extends: [Initializable](Initializable.md), [ERC20](ERC20.md)**

**CTokenMock**

## Contract Members
**Constants & Variables**

```js
contract IERC20 public token;
uint256 public supplyRatePerBlock;
uint256 public getCash;
uint256 public totalReserves;
uint256 public exchangeRateStored;

```

## Functions

- [initialize(address tokenAddress)](#initialize)
- [seed(uint256 _supplyRatePerBlock, uint256 _getCash, uint256 _totalReserves, uint256 _exchangeRateStored, uint256 _totalSupply, address mintRecipient)](#seed)
- [mint(uint256 mintAmount)](#mint)
- [redeem(uint256 redeemTokens)](#redeem)
- [redeemUnderlying(uint256 redeemAmount)](#redeemunderlying)
- [setSupplyRatePerBlock(uint256 _supplyRatePerBlock)](#setsupplyrateperblock)
- [setGetCash(uint256 _getCash)](#setgetcash)
- [setTotalReserves(uint256 _setTotalReserves)](#settotalreserves)
- [setexchangeRateStored(uint256 _exchangeRateStored)](#setexchangeratestored)

### initialize

```js
function initialize(address tokenAddress) public nonpayable initializer 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| tokenAddress | address |  | 

### seed

```js
function seed(uint256 _supplyRatePerBlock, uint256 _getCash, uint256 _totalReserves, uint256 _exchangeRateStored, uint256 _totalSupply, address mintRecipient) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _supplyRatePerBlock | uint256 |  | 
| _getCash | uint256 |  | 
| _totalReserves | uint256 |  | 
| _exchangeRateStored | uint256 |  | 
| _totalSupply | uint256 |  | 
| mintRecipient | address |  | 

### mint

msg.sender account which shall supply the asset, and own the minted cTokens.

```js
function mint(uint256 mintAmount) public nonpayable
returns(uint256)
```

**Returns**

uint 256: 0 on success, otherwise an Error codes

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| mintAmount | uint256 | : The amount of the asset to be supplied, in units of the underlying asset. | 

### redeem

```js
function redeem(uint256 redeemTokens) public nonpayable
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| redeemTokens | uint256 |  | 

### redeemUnderlying

```js
function redeemUnderlying(uint256 redeemAmount) public nonpayable
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| redeemAmount | uint256 |  | 

### setSupplyRatePerBlock

```js
function setSupplyRatePerBlock(uint256 _supplyRatePerBlock) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _supplyRatePerBlock | uint256 |  | 

### setGetCash

```js
function setGetCash(uint256 _getCash) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _getCash | uint256 |  | 

### setTotalReserves

```js
function setTotalReserves(uint256 _setTotalReserves) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _setTotalReserves | uint256 |  | 

### setexchangeRateStored

```js
function setexchangeRateStored(uint256 _exchangeRateStored) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _exchangeRateStored | uint256 |  | 

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
