var ctoken = artifacts.require("CTokenMock");
var token = artifacts.require("TokenMock");
var Cherryswap = artifacts.require("Cherryswap");

const configJSON = require('./config.json');

module.exports = (deployer) => {
    let tokenAddress = configJSON.token;
    let ctokenAddress = configJSON.ctoken;
    let swapmathAddress = configJSON.swapmath;

    deployer.then(async() => {
        let token, ctoken;
        if(tokenAddress == null) {
            token = await deployer.deploy(token);
            tokenAddress = token.address;
        }
        if(ctokenAddress == null) {
            ctoken = await deployer.deploy(ctoken);
            ctokenAddress = ctoken.address;
        }
        await deployer.deploy(Cherryswap, tokenAddress, ctokenAddress, swapmathAddress);
    });
}
