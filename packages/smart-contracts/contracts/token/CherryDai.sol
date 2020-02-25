pragma solidity ^0.5.12;

import "@openzeppelin/upgrades/contracts/Initializable.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20Detailed.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20Mintable.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20Burnable.sol";


contract CherryDai is Initializable, ERC20Detailed, ERC20Mintable, ERC20Burnable {
    function initialize(address _cherrySwap) public initializer {
        ERC20Detailed.initialize("Cherry Dai", "CherryDAI", 8);

        ERC20Mintable.initialize(msg.sender);

        if (msg.sender != _cherrySwap) {
            MinterRole.addMinter(_cherrySwap);
            MinterRole.renounceMinter();
        }
    }
}
