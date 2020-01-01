var TokenMock = artifacts.require("./TokenMock.sol");
var CTokenMock = artifacts.require("./CTokenMock.sol");
var CherryDai = artifacts.require("./CherryDai.sol");
var CherryMath = artifacts.require("./CherryMath.sol");
var CherrySwap = artifacts.require("./CherrySwap.sol");


module.exports = async (deployer, network, accounts) => {
    if (network == "development") {
        await deployer.deploy(TokenMock);
        await deployer.deploy(CTokenMock);
        await deployer.deploy(CherryMath);
        await deployer.deploy(CherrySwap, TokenMock.address, CTokenMock.address, CherryMath.address);
        await deployer.deploy(CherryDai, CherrySwap.address);
    }
    else {
    }
}
