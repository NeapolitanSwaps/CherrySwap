pragma solidity >=0.4.21 <0.6.0;

import "@openzeppelin/upgrades/contracts/Initializable.sol";

contract Migrations is Initializable{
    address public owner;
    uint256 public last_completed_migration;

    function initialize() public initializer {
        owner = msg.sender;
    }

    modifier restricted() {
        if (msg.sender == owner) _;
    }

    function setCompleted(uint256 completed) public restricted {
        last_completed_migration = completed;
    }

    function upgrade(address new_address) public restricted {
        Migrations upgraded = Migrations(new_address);
        upgraded.setCompleted(last_completed_migration);
    }
}
