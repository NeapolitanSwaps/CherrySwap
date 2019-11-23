const {
  BN,
  constants,
  expectEvent,
  expectRevert,
  ether
} = require("@openzeppelin/test-helpers");
const BigNumber = require('bignumber.js');
const EVMRevert = require('./helpers/EVMRevert').EVMRevert;

//mock contracts
const TokenContract = artifacts.require("TokenMock");
const CTokenContract = artifacts.require("CTokenMock");

//cherrypool contracts
//const CherrypoolContract = artifacts.require("Cherrypool");
const CherryswapContract = artifacts.require("Cherryswap");

require('chai')
.use(require('chai-as-promised'))
.use(require('chai-bignumber')(BigNumber))
.should();

contract('Cherrypool contract', ([contractOwner, provider1, provider2, provider3, provider4, provider5, random]) => {
  const supplyToMint = ether("500");

  let token;
  let cToken;
  let cherrypool;

  before(async function () {
    token = await TokenContract.new({
      from: contractOwner
    });

    cToken = await CTokenContract.new({
      from: contractOwner
    })

    /*cherrypool = await CherrypoolContract.new({
      from: contractOwner
    })

    await cherrypool.initialize(token.address, cToken.address, {
      from: contractOwner
    })*/

    cherryswap = await CherryswapContract.new({
      from: contractOwner
    })

    await cherryswap.initialize(token.address, cToken.address, {
      from: contractOwner
    })


    // Mint DAI for liquidity providers
    token.mint(provider1, supplyToMint);
    token.mint(provider2, supplyToMint);
    token.mint(provider3, supplyToMint);
    token.mint(provider4, supplyToMint);
    token.mint(provider5, supplyToMint);
  });

  context("Deployment", async function () {
    it("check deployment", async function () {
      let poolBalance = await cherryswap.poolBalance.call();
      assert.equal(poolBalance, 0);
    });
  });

  context("Deposit", async() => {
    let amountToDeposit = ether("100");

    it("Deposit liquidity into the pool", async() => {
      await token.approve(cherryswap.address, amountToDeposit, {from: provider1});
      await cherryswap.mint(amountToDeposit, {from: provider1});
      let providerCherryDaiBalance = await cherryswap.cherryDaiBalanceOf(provider1);
      assert(providerCherryDaiBalance, amountToDeposit, "Wrong minted amount for liqudity provider");
    });

    it("reserve", async() => {
      let longPoolReserved = await cherryswap.longPoolReserved.call();
      console.log(longPoolReserved.toString());

      let amountToReserve = ether("30");
      await cherryswap.reserveLongPool(40);

      longPoolReserved = await cherryswap.longPoolReserved.call();
      console.log(longPoolReserved.toString());

    });
  });

});  