pragma solidity ^0.5.12;

import "@openzeppelin/upgrades/contracts/Initializable.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20Detailed.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20Mintable.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20Burnable.sol";

contract CherryDai is
    Initializable,
    ERC20Detailed,
    ERC20Mintable,
    ERC20Burnable
{
    function initialize(address _cherrySwap) public initializer {
        // need a better name & symbol for sure
        ERC20Detailed.initialize("Cherry Dai", "CHD", 18);

        ERC20Mintable.initialize(msg.sender);
        mint(_cherrySwap, 100);

        if(msg.sender != _cherrySwap) {
            MinterRole.addMinter(_cherrySwap);
            MinterRole.renounceMinter();
        }
    }

}
