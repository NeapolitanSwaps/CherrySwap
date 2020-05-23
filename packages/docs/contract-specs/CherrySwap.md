# CherrySwap Contract (CherrySwap.sol)

View Source: [contracts/CherrySwap.sol](../../smart-contracts/contracts/CherrySwap.sol)

**↗ Extends: [Initializable](Initializable.md), [CherryPool](CherryPool.md)**

**CherrySwap**

Create, manage and store all interest rate swaps within the Cherryswap platform.
Offers one side of a swap with the other taken by a liquidity pool. The offered rate is
a function of the pool demand (utilization) and the current floating rates.

**Enums**
### Bet

```js
enum Bet {
 Short,
 Long
}
```

## Structs
### Swap

```js
struct Swap {
 address owner,
 uint256 swapId,
 uint256 startingTime,
 uint256 endingTime,
 uint256 fixedRateOffer,
 uint256 amount,
 uint256 cTokenAmount,
 uint256 reserveAmount,
 uint256 startingcTokenExchangeRate,
 enum CherrySwap.Bet bet
}
```

## Contract Members
**Constants & Variables**

```js
//internal members
uint256 internal constant MAX_INTEREST_PAID_PER_BLOCK;
uint256 internal constant ALPHA;
uint256 internal constant BETA;
uint256 internal constant RAGE_QUITE_PENALTY;
uint256 internal constant ONE_MONTH_SECONDS;

//public members
struct CherrySwap.Swap[] public swaps;

```

**Events**

```js
event CreateLongPosition(address indexed trader, uint256 indexed swapId, uint256  startingTime, uint256  endingTime, uint256  daiAmount, uint256  cDaiAmount, uint256  fixedRate, uint256  amountReserved, uint256  startingcDaiExchRate);
event CreateShortPosition(address indexed trader, uint256 indexed swapId, uint256  startingTime, uint256  endingTime, uint256  daiAmount, uint256  cDaiAmount, uint256  fixedRate, uint256  amountReserved, uint256  startingcDaiExchRate);
event ClosePosition(uint256 indexed swapId, address indexed trader, uint256  cDaiRedeemed, uint256  daiTransfered);
event FixedRateOffer(uint256  rate);
```

## Functions

- [initialize(address _token, address _cToken, address _cherryMath)](#initialize)
- [createLongPosition(uint256 _amount)](#createlongposition)
- [createShortPosition(uint256 _amount)](#createshortposition)
- [closePosition(uint256 _swapId)](#closeposition)
- [tokensToPayTrader(struct CherrySwap.Swap _swap)](#tokenstopaytrader)
- [rageQuitSwap(uint256 _swapId)](#ragequitswap)
- [numSwaps()](#numswaps)
- [getFixedRateOffer(enum CherrySwap.Bet bet)](#getfixedrateoffer)
- [getFloatingValue(uint256 _startingExchangeRate, uint256 _endingExchangeRate, uint256 _amount)](#getfloatingvalue)

### initialize

⤾ overrides [CherryPool.initialize](CherryPool.md#initialize)

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

### createLongPosition

requires long pool utilization < 100% and enough liquidity in the long pool to cover trader.

```js
function createLongPosition(uint256 _amount) external nonpayable isLongUtilized 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _amount | uint256 | the number of Dai that the buyer will pay for their long position | 

### createShortPosition

requires short pool utlization < 100% and enough liquidity in the short pool to cover trader

```js
function createShortPosition(uint256 _amount) external nonpayable isShortUtilized 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _amount | uint256 | the number of Dai that the buyer will pay for their short position | 

### closePosition

if the time is after the end of the swap then they will receive the swap rate for
the duration of the swap and then the floating market rate between the end of the
swap and the current time.

```js
function closePosition(uint256 _swapId) external nonpayable
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _swapId | uint256 | swap number | 

### tokensToPayTrader

long offer swap where the liquidity pool is short: receiving a fixed rate and paying a floating rate

```js
function tokensToPayTrader(struct CherrySwap.Swap _swap) internal nonpayable
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _swap | struct CherrySwap.Swap |  | 

### rageQuitSwap

This will eject them from the position, free up liquidity and they walk away with some dai
however there is a heavy penalty in doing this!

```js
function rageQuitSwap(uint256 _swapId) external nonpayable
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _swapId | uint256 |  | 

### numSwaps

```js
function numSwaps() public view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### getFixedRateOffer

calculate the offered fixed rate for swaps taken against the liquidity pool
in future this will be updated to consider the size of the positon. for now it's kept simple.

```js
function getFixedRateOffer(enum CherrySwap.Bet bet) public nonpayable
returns(_fixedRateOffer uint256)
```

**Returns**

_fixedRateOffer offered fixed rate

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| bet | enum CherrySwap.Bet | position bet (long or short) | 

### getFloatingValue

this acts to scale the amount by the change in exchange rate seen by the cToken.
If the starting cToken exchange rate is stored and the end rate is known then this function returns
the value that _amount has grown by.

```js
function getFloatingValue(uint256 _startingExchangeRate, uint256 _endingExchangeRate, uint256 _amount) public view
returns(uint256)
```

**Returns**

swap position valuation

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _startingExchangeRate | uint256 | starting cToken exchange rate | 
| _endingExchangeRate | uint256 | ending cToken exchange rate | 
| _amount | uint256 | token amount | 

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
