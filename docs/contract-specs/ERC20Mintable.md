# ERC20Mintable.sol

View Source: [@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20Mintable.sol](../../packages/smart-contracts/@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20Mintable.sol)

**↗ Extends: [Initializable](Initializable.md), [ERC20](ERC20.md), [MinterRole](MinterRole.md)**
**↘ Derived Contracts: [CherryDai](CherryDai.md)**

**ERC20Mintable**

Extension of {ERC20} that adds a set of accounts with the {MinterRole},
which have permission to mint (create) new tokens as they see fit.
 * At construction, the deployer of the contract is the only minter.

## Contract Members
**Constants & Variables**

```js
uint256[50] private ______gap;

```

## Functions

- [initialize(address sender)](#initialize)
- [mint(address account, uint256 amount)](#mint)

### initialize

⤾ overrides [MinterRole.initialize](MinterRole.md#initialize)

```js
function initialize(address sender) public nonpayable initializer 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| sender | address |  | 

### mint

See {ERC20-_mint}.
     * Requirements:
     * - the caller must have the {MinterRole}.

```js
function mint(address account, uint256 amount) public nonpayable onlyMinter 
returns(bool)
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
