# CherryMath.sol

View Source: [contracts/CherryMath.sol](../../smart-contracts/contracts/CherryMath.sol)

**↗ Extends: [Initializable](Initializable.md)**

**CherryMath**

**Enums**
### MathError

```js
enum MathError {
 NO_ERROR,
 DIVISION_BY_ZERO,
 INTEGER_OVERFLOW,
 INTEGER_UNDERFLOW,
 IexpScaleNTEGER_OVERFLOW
}
```

## Contract Members
**Constants & Variables**

```js
uint256 private constant FIXED_1;

```

## Functions

- [mulUInt(uint256 a, uint256 b)](#muluint)
- [divUInt(uint256 a, uint256 b)](#divuint)
- [subUInt(uint256 a, uint256 b)](#subuint)
- [addUInt(uint256 a, uint256 b)](#adduint)
- [addThenSubUInt(uint256 a, uint256 b, uint256 c)](#addthensubuint)
- [optimalExp(uint256 x)](#optimalexp)
- [capFunction(uint256 r, uint256 t1, uint256 t2)](#capfunction)
- [futureValue(uint256 N, uint256 r, uint256 t1, uint256 t2)](#futurevalue)
- [cDaitoDai(uint256 _cDai, uint256 _cDaiPrice)](#cdaitodai)
- [computeRatios(uint256 _startcDaiPool, uint256 _startShortPoolDai, uint256 _fixedNACB, uint256 _startingTime, uint256 _endingTime, uint256 _endcDaiEndPrice)](#computeratios)
- [mulScalarTruncate(uint256 a, uint256 scalar)](#mulscalartruncate)
- [mulScalar(uint256 mantissa, uint256 scalar)](#mulscalar)
- [truncate(uint256 mantissa)](#truncate)

### mulUInt

Multiplies two numbers, returns an error on overflow.

```js
function mulUInt(uint256 a, uint256 b) internal pure
returns(enum CherryMath.MathError, uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| a | uint256 |  | 
| b | uint256 |  | 

### divUInt

Integer division of two numbers, truncating the quotient.

```js
function divUInt(uint256 a, uint256 b) internal pure
returns(enum CherryMath.MathError, uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| a | uint256 |  | 
| b | uint256 |  | 

### subUInt

Subtracts two numbers, returns an error on overflow (i.e. if subtrahend is greater than minuend).

```js
function subUInt(uint256 a, uint256 b) internal pure
returns(enum CherryMath.MathError, uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| a | uint256 |  | 
| b | uint256 |  | 

### addUInt

Adds two numbers, returns an error on overflow.

```js
function addUInt(uint256 a, uint256 b) internal pure
returns(enum CherryMath.MathError, uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| a | uint256 |  | 
| b | uint256 |  | 

### addThenSubUInt

add a and b and then subtract c

```js
function addThenSubUInt(uint256 a, uint256 b, uint256 c) internal pure
returns(enum CherryMath.MathError, uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| a | uint256 |  | 
| b | uint256 |  | 
| c | uint256 |  | 

### optimalExp

computes e ^ (x / FIXED_1) * FIXED_1
input range: 0 <= x <= OPT_EXP_MAX_VAL - 1
auto-generated via 'PrintFunctionOptimalExp.py'
Detailed description:
- Rewrite the input as a sum of binary exponents and a single residual r, as small as possible
- The exponentiation of each binary exponent is given (pre-calculated)
- The exponentiation of r is calculated via Taylor series for e^x, where x = r
- The exponentiation of the input is calculated by multiplying the intermediate results above
- For example: e^5.521692859 = e^(4 + 1 + 0.5 + 0.021692859) = e^4 * e^1 * e^0.5 * e^0.021692859

```js
function optimalExp(uint256 x) public pure
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| x | uint256 |  | 

### capFunction

```js
function capFunction(uint256 r, uint256 t1, uint256 t2) public pure
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| r | uint256 |  | 
| t1 | uint256 |  | 
| t2 | uint256 |  | 

### futureValue

```js
function futureValue(uint256 N, uint256 r, uint256 t1, uint256 t2) public view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| N | uint256 |  | 
| r | uint256 |  | 
| t1 | uint256 |  | 
| t2 | uint256 |  | 

### cDaitoDai

```js
function cDaitoDai(uint256 _cDai, uint256 _cDaiPrice) public pure
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _cDai | uint256 |  | 
| _cDaiPrice | uint256 |  | 

### computeRatios

```js
function computeRatios(uint256 _startcDaiPool, uint256 _startShortPoolDai, uint256 _fixedNACB, uint256 _startingTime, uint256 _endingTime, uint256 _endcDaiEndPrice) public view
returns(longPayout uint256, shortPayout uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _startcDaiPool | uint256 |  | 
| _startShortPoolDai | uint256 |  | 
| _fixedNACB | uint256 |  | 
| _startingTime | uint256 |  | 
| _endingTime | uint256 |  | 
| _endcDaiEndPrice | uint256 |  | 

### mulScalarTruncate

Multiply an Exp by a scalar, then truncate to return an unsigned integer.

```js
function mulScalarTruncate(uint256 a, uint256 scalar) external pure
returns(enum CherryMath.MathError, uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| a | uint256 |  | 
| scalar | uint256 |  | 

### mulScalar

Multiply an Exp by a scalar, returning a new Exp.

```js
function mulScalar(uint256 mantissa, uint256 scalar) internal pure
returns(enum CherryMath.MathError, uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| mantissa | uint256 |  | 
| scalar | uint256 |  | 

### truncate

Truncates the given exp to a whole number value.
     For example, truncate(Exp{mantissa: 15 * expScale}) = 15

```js
function truncate(uint256 mantissa) internal pure
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| mantissa | uint256 |  | 

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
