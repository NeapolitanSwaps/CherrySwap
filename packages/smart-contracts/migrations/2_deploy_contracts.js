const { scripts, ConfigManager } = require("@openzeppelin/cli");
const { add, push, create } = scripts;

const config = require("./deployment-config.json");

async function deployDev(options) {
    add({ contractsData: [{ name: 'TokenMock', alias: 'TokenMock' }] });
    await push(options);
    await create(Object.assign({ contractAlias: 'TokenMock' }, options));

    add({ contractsData: [{ name: 'CTokenMock', alias: 'CTokenMock' }] });
    await push(options);
    await create(Object.assign({ contractAlias: 'CTokenMock' }, options));

    add({ contractsData: [{ name: 'CherryMath', alias: 'CherryMath' }] });
    await push(options);
    await create(Object.assign({ contractAlias: 'CherryMath' }, options));

    add({ contractsData: [{ name: 'CherrySwap', alias: 'CherrySwap' }] });
    await push(options);
    await create(Object.assign({ 
        contractAlias: 'CherrySwap', 
        methodName: 'initialize', 
        methodArgs: [
            TokenMock.address,
            CTokenMock.address,
            CherryMath.address
        ]
    }, options));

    add({ contractsData: [{ name: 'CherryDai', alias: 'CherryDai' }] });
    await push(options);
    await create(Object.assign({ contractAlias: 'CherryDai', methodName: 'initialize', methodArgs: [CherrySwap.address] }, options));
}

async function deploy(options) {
    add({ contractsData: [{ name: 'CherryMath', alias: 'CherryMath' }] });
    await push(options);
    await create(Object.assign({ contractAlias: 'CherryMath' }, options));

    add({ contractsData: [{ name: 'CherrySwap', alias: 'CherrySwap' }] });
    await push(options);
    await create(Object.assign({ 
        contractAlias: 'CherrySwap', 
        methodName: 'initialize', 
        methodArgs: [
            config.Token,
            config.CToken,
            CherryMath.address
        ]
    }, options));

    add({ contractsData: [{ name: 'CherryDai', alias: 'CherryDai' }] });
    await push(options);
    await create(Object.assign({ contractAlias: 'CherryDai', methodName: 'initialize', methodArgs: [CherrySwap.address] }, options));
}

module.exports = function(deployer, networkName, accounts) {
    deployer.then(async () => {
        const { network, txParams } = await ConfigManager.initNetworkConfiguration({ network: networkName, from: accounts[0] });
        if (networkName == "development") {
            await deployDev({ network, txParams });            
        }
        else {
            await deploy({ network, txParams });
        }
    })
}
