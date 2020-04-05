pragma solidity ^0.5.12;

import "@openzeppelin/upgrades/contracts/Initializable.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20Detailed.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20Mintable.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20Burnable.sol";


contract CherryDai is Initializable, ERC20Detailed, ERC20Mintable, ERC20Burnable {
    function initialize(
        address _cherrySwap,
        string memory _name,
        string memory _symbol,
        uint8 _decimals
    ) public initializer {
        ERC20Detailed.initialize(_name, _symbol, _decimals);

        ERC20Mintable.initialize(msg.sender);

        if (msg.sender != _cherrySwap) {
            MinterRole.addMinter(_cherrySwap);
            MinterRole.renounceMinter();
        }
    }
}
