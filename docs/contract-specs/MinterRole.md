# MinterRole.sol

View Source: [@openzeppelin/contracts-ethereum-package/contracts/access/roles/MinterRole.sol](../../packages/smart-contracts/@openzeppelin/contracts-ethereum-package/contracts/access/roles/MinterRole.sol)

**↗ Extends: [Initializable](Initializable.md), [Context](Context.md)**
**↘ Derived Contracts: [ERC20Mintable](ERC20Mintable.md)**

**MinterRole**

## Contract Members
**Constants & Variables**

```js
struct Roles.Role private _minters;
uint256[50] private ______gap;

```

**Events**

```js
event MinterAdded(address indexed account);
event MinterRemoved(address indexed account);
```

## Modifiers

- [onlyMinter](#onlyminter)

### onlyMinter

```js
modifier onlyMinter() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

## Functions

- [initialize(address sender)](#initialize)
- [isMinter(address account)](#isminter)
- [addMinter(address account)](#addminter)
- [renounceMinter()](#renounceminter)
- [_addMinter(address account)](#_addminter)
- [_removeMinter(address account)](#_removeminter)

### initialize

⤿ Overridden Implementation(s): [ERC20Mintable.initialize](ERC20Mintable.md#initialize)

```js
function initialize(address sender) public nonpayable initializer 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| sender | address |  | 

### isMinter

```js
function isMinter(address account) public view
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| account | address |  | 

### addMinter

```js
function addMinter(address account) public nonpayable onlyMinter 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| account | address |  | 

### renounceMinter

```js
function renounceMinter() public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### _addMinter

```js
function _addMinter(address account) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| account | address |  | 

### _removeMinter

```js
function _removeMinter(address account) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| account | address |  | 

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
