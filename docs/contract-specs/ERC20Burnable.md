# ERC20Burnable.sol

View Source: [@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20Burnable.sol](../../packages/smart-contracts/@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20Burnable.sol)

**↗ Extends: [Initializable](Initializable.md), [Context](Context.md), [ERC20](ERC20.md)**
**↘ Derived Contracts: [CherryDai](CherryDai.md)**

**ERC20Burnable**

Extension of {ERC20} that allows token holders to destroy both their own
tokens and those that they have an allowance for, in a way that can be
recognized off-chain (via event analysis).

## Contract Members
**Constants & Variables**

```js
uint256[50] private ______gap;

```

## Functions

- [burn(uint256 amount)](#burn)
- [burnFrom(address account, uint256 amount)](#burnfrom)

### burn

Destroys `amount` tokens from the caller.
     * See {ERC20-_burn}.

```js
function burn(uint256 amount) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| amount | uint256 |  | 

### burnFrom

See {ERC20-_burnFrom}.

```js
function burnFrom(address account, uint256 amount) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| account | address |  | 
| amount | uint256 |  | 

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
