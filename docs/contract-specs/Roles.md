# Roles (Roles.sol)

View Source: [@openzeppelin/contracts-ethereum-package/contracts/access/Roles.sol](../../packages/smart-contracts/@openzeppelin/contracts-ethereum-package/contracts/access/Roles.sol)

**Roles**

Library for managing addresses assigned to a Role.

## Structs
### Role

```js
struct Role {
 mapping(address => bool) bearer
}
```

## Functions

- [add(struct Roles.Role role, address account)](#add)
- [remove(struct Roles.Role role, address account)](#remove)
- [has(struct Roles.Role role, address account)](#has)

### add

Give an account access to this role.

```js
function add(struct Roles.Role role, address account) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| role | struct Roles.Role |  | 
| account | address |  | 

### remove

Remove an account's access to this role.

```js
function remove(struct Roles.Role role, address account) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| role | struct Roles.Role |  | 
| account | address |  | 

### has

Check if an account has this role.

```js
function has(struct Roles.Role role, address account) internal view
returns(bool)
```

**Returns**

bool

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| role | struct Roles.Role |  | 
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
