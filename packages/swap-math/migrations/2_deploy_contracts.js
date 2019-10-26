var SwapMath = artifacts.require("SwapMath");

async function doDeploy(deployer) {
    await deployer.deploy(SwapMath);
}

module.exports = (deployer) => {
    deployer.then(async() => {
        await doDeploy(deployer);
    });
}
