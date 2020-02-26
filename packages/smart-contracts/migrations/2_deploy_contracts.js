const { scripts, ConfigManager } = require("@openzeppelin/cli");
const { add, push, create } = scripts;

var CherrySwap = artifacts.require("CherrySwap");

const config = require("./deployment-config.json");

async function deployDev(options) {
  add({
    contractsData: [
      { name: "TokenMock", alias: "TokenMock" },
      { name: "CTokenMock", alias: "CTokenMock" },
      { name: "CherryMath", alias: "CherryMath" },
      { name: "CherrySwap", alias: "CherrySwap" },
      { name: "CherryDai", alias: "CherryDai" }
    ]
  });

  await push(options);

  let tokenMock = await create(Object.assign({ contractAlias: "TokenMock" }, options));
  let cTokenMock = await create(Object.assign({ contractAlias: "CTokenMock" }, options));
  let cherryMath = await create(Object.assign({ contractAlias: "CherryMath" }, options));
  let cherrySwap = await create(
    Object.assign(
      {
        contractAlias: "CherrySwap",
        methodName: "initialize",
        methodArgs: [tokenMock.address, cTokenMock.address, cherryMath.address]
      },
      options
    )
  );
  let cherryDai = await create(
    Object.assign({ contractAlias: "CherryDai", methodName: "initialize", methodArgs: [cherrySwap.address] }, options)
  );

  let cherrySwapInstance = await CherrySwap.at(cherrySwap.address);
  await cherrySwapInstance.setToken(cherryDai.address);
}

async function deploy(options) {
  add({
    contractsData: [
      { name: "CherryMath", alias: "CherryMath" },
      { name: "CherrySwap", alias: "CherrySwap" },
      { name: "CherryDai", alias: "CherryDai" }
    ]
  });

  await push(options);

  let cherryMath = await create(Object.assign({ contractAlias: "CherryMath" }, options));
  let cherrySwap = await create(
    Object.assign(
      {
        contractAlias: "CherrySwap",
        methodName: "initialize",
        methodArgs: [config.Token, config.CToken, cherryMath.address]
      },
      options
    )
  );

  let cherryDai = await create(
    Object.assign({ contractAlias: "CherryDai", methodName: "initialize", methodArgs: [cherrySwap.address] }, options)
  );

  let cherrySwapInstance = await CherrySwap.at(cherrySwap.address);
  await cherrySwapInstance.setToken(cherryDai.address);
}

module.exports = function(deployer, networkName, accounts) {
  deployer.then(async () => {
    const { network, txParams } = await ConfigManager.initNetworkConfiguration({
      network: networkName,
      from: accounts[0]
    });
    if (networkName == "development") {
      await deployDev({ network, txParams });
    } else {
      await deploy({ network, txParams });
    }
  });
};
