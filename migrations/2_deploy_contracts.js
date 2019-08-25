var swapMath = artifacts.require("SwapMath");
var cherryswap = artifacts.require("Cherryswap");

module.exports = function (deployer) {
    deployer.deploy(swapMath)
    .then(async c => {
        console.log(c.address)
        await deployer.deploy(cherryswap, '0xC4375B7De8af5a38a93548eb8453a498222C4fF2', '0x0a1e4d0b5c71b955c0a5993023fc48ba6e380496', c.address).then(d => {
        })
    });
};