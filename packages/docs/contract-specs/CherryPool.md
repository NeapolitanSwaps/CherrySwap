# CherryPool Contract (CherryPool.sol)

View Source: [contracts/CherryPool.sol](../../smart-contracts/contracts/CherryPool.sol)

**↗ Extends: [Initializable](Initializable.md)**
**↘ Derived Contracts: [CherrySwap](CherrySwap.md)**

**CherryPool**

This contract handle Cherry Pool functionalities

## Contract Members
**Constants & Variables**

```js
//public members
address public owner;
uint256 public poolBalance;
uint256 public poolcBalance;
uint256 public longPoolBalance;
uint256 public shortPoolBalance;
uint256 public longPoolReserved;
uint256 public shortPoolReserved;
int256 public poolcTokenProfit;
contract IERC20 public token;
contract ICERC20 public cToken;
contract CherryDai public cherryDai;

//internal members
contract CherryMath internal cherryMath;

```

**Events**

```js
event DepositLiquidity(address indexed liquidityProvider, uint256  amount);
event MintCherry(address indexed liquidityProvider, uint256  amountDai, uint256  amountcDai, uint256  amountCherryDai);
event RedeemCherry(address indexed liquidityProvider, uint256  redeemedCherryDaiDaiAmount);
event TransferDai(address indexed to, uint256  value);
event CurrentExchangeRate(uint256  rate);
event PoolShare(uint256  amount);
event FreeLongPool(uint256  amount);
event FreeShortPool(uint256  amount);
event SetCherryDai(address  cherryDai);
```

## Modifiers

- [isLongUtilized](#islongutilized)
- [isShortUtilized](#isshortutilized)
- [canReserveLong](#canreservelong)
- [canReserveShort](#canreserveshort)

### isLongUtilized

Modifier to check if long pool is not fully utilized

```js
modifier isLongUtilized() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### isShortUtilized

Modifier to check if short pool is not fully utilized

```js
modifier isShortUtilized() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### canReserveLong

```js
modifier canReserveLong(uint256 _amount) internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _amount | uint256 |  | 

### canReserveShort

```js
modifier canReserveShort(uint256 _amount) internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _amount | uint256 |  | 

## Functions

- [initialize(address _token, address _cToken, address _cherryMath)](#initialize)
- [mint(uint256 _amount)](#mint)
- [calcLongPoolUtil(uint256 _longPoolReserved)](#calclongpoolutil)
- [calcShortPoolUtil(uint256 _shortPoolReserved)](#calcshortpoolutil)
- [cherryDaiBalanceOf(address _provider)](#cherrydaibalanceof)
- [redeem(uint256 _amount)](#redeem)
- [getCashPrior()](#getcashprior)
- [payout(address _redeemer, uint256 _redeemedDaiAmount, uint256 _redeemedCherryDaiTokens)](#payout)
- [exchangeRate()](#exchangerate)
- [setToken(address _token)](#settoken)
- [_reserveLongPool(uint256 _amount)](#_reservelongpool)
- [_reserveShortPool(uint256 _amount)](#_reserveshortpool)
- [_freeLongPool(uint256 _amount)](#_freelongpool)
- [_freeShortPool(uint256 _amount)](#_freeshortpool)
- [_addcTokenPoolProfit(int256 _profit)](#_addctokenpoolprofit)
- [getcTokenExchangeRate()](#getctokenexchangerate)

### initialize

⤿ Overridden Implementation(s): [CherrySwap.initialize](CherrySwap.md#initialize)

Initialize contract states

```js
function initialize(address _token, address _cToken, address _cherryMath) public nonpayable initializer 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _token | address |  | 
| _cToken | address |  | 
| _cherryMath | address |  | 

### mint

adds liquidity to the cherry pool to offer swaps against

```js
function mint(uint256 _amount) external nonpayable
returns(uint256)
```

**Returns**

cherryDaiToMint amount of minted CherryDai

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _amount | uint256 | amount of deposited DAI | 

### calcLongPoolUtil

Get long pool utilization

```js
function calcLongPoolUtil(uint256 _longPoolReserved) public view
returns(uint256)
```

**Returns**

current long pool utilization as a decimal scaled 10*18

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _longPoolReserved | uint256 | amount of liquidity reserved in the long pool | 

### calcShortPoolUtil

Get short pool utilization

```js
function calcShortPoolUtil(uint256 _shortPoolReserved) public view
returns(uint256)
```

**Returns**

current short pool utilization as a decimal scaled 10*18

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _shortPoolReserved | uint256 | amount of liquidity reserved in the short pool | 

### cherryDaiBalanceOf

Get Cherrydai balance for liquidity provider

```js
function cherryDaiBalanceOf(address _provider) public view
returns(uint256)
```

**Returns**

CherryDai balance

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _provider | address | liquidity provider address | 

### redeem

the amount returned is the number of cherrytokens multiplied by the current exchange rate
The sender should approve the _amount to this contract address

```js
function redeem(uint256 _amount) external nonpayable isLongUtilized isShortUtilized 
returns(uint256)
```

**Returns**

daiRedeemed amount of DAI redeemed

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _amount | uint256 | amount of CherryDai to redeem | 

### getCashPrior

Get available pool balance (total pool balance - total reserved balance)

```js
function getCashPrior() internal nonpayable
returns(uint256)
```

**Returns**

available pool balance

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### payout

Transfer the underlying asset

```js
function payout(address _redeemer, uint256 _redeemedDaiAmount, uint256 _redeemedCherryDaiTokens) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _redeemer | address | redeemer address | 
| _redeemedDaiAmount | uint256 | amount of DAI to transfer | 
| _redeemedCherryDaiTokens | uint256 | amount of CherryDAI to burn | 

### exchangeRate

Each CherryDai is convertible into the underlying asset + the fees accrued through liquidity provision.

```js
function exchangeRate() public nonpayable
returns(uint256)
```

**Returns**

rate Exchange rate

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### setToken

can only be called by the owner

```js
function setToken(address _token) external nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _token | address | CherryDai token address | 

### _reserveLongPool

```js
function _reserveLongPool(uint256 _amount) internal nonpayable canReserveLong 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _amount | uint256 |  | 

### _reserveShortPool

```js
function _reserveShortPool(uint256 _amount) internal nonpayable canReserveShort 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _amount | uint256 |  | 

### _freeLongPool

```js
function _freeLongPool(uint256 _amount) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _amount | uint256 |  | 

### _freeShortPool

```js
function _freeShortPool(uint256 _amount) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _amount | uint256 |  | 

### _addcTokenPoolProfit

```js
function _addcTokenPoolProfit(int256 _profit) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _profit | int256 |  | 

### getcTokenExchangeRate

```js
function getcTokenExchangeRate() public view
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
