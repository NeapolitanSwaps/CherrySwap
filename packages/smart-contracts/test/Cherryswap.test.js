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

const CherryMathContract = artifacts.require("CherryMath");
const CherryswapContract = artifacts.require("CherrySwap");

require('chai')
.use(require('chai-as-promised'))
.use(require('chai-bignumber')(BigNumber))
.should();

contract('Cherryswap contracts', ([contractOwner, provider1, provider2, provider3, trader1, trader2, trader3, random]) => {
  const supplyToMint = ether("500");

  let token, cToken, cherrymath, cherryswap;

  before(async function () {
    token = await TokenContract.new({
      from: contractOwner
    });

    cToken = await CTokenContract.new({
      from: contractOwner
    })

    cherrymath = await CherryMathContract.new({
      from: contractOwner
    });

    cherryswap = await CherryswapContract.new({
      from: contractOwner
    })

    await cherryswap.initialize(token.address, cToken.address, cherrymath.address, {
      from: contractOwner
    })


    // Mint DAI for liquidity providers
    token.mint(provider1, supplyToMint);
    token.mint(provider2, supplyToMint);
    token.mint(provider3, supplyToMint);
    token.mint(trader1, supplyToMint);
    token.mint(trader2, supplyToMint);
    token.mint(trader3, supplyToMint);
  });

  context("Deployment", async function () {
    it("check deployment", async function () {
      let poolBalance = await cherryswap.poolBalance.call();
      assert.equal(poolBalance, 0);
    });
  });

  context("Deposit Liquidity", async() => {
    let _amountToDeposit = ether("100");

    it("Deposit liquidity into the pool", async() => {
      await token.approve(cherryswap.address, _amountToDeposit, {from: provider1});
      await cherryswap.mint(_amountToDeposit, {from: provider1});
      let _exchangeRate = await cherryswap.exchangeRateInternal();
      let providerCherryDaiBalance = await cherryswap.cherryDaiBalanceOf(provider1);
      assert.equal(providerCherryDaiBalance, _amountToDeposit*parseInt(_exchangeRate[1]), "Wrong CherryDai minted amount for liquidity provider");
      assert.equal((await cherryswap.poolBalance()).toString(), _amountToDeposit, "Wrong pool balance");
      assert.equal((await cherryswap.longPoolBalance()).toString(), (await cherryswap.shortPoolBalance()).toString(), "Long and Short pool are not equal");
    });

    /*
    it("reserve", async() => {
      let longPoolReserved = await cherryswap.longPoolReserved.call();
      console.log(longPoolReserved.toString());

      let amountToReserve = ether("30");
      await cherryswap.reserveLongPool(40);

      longPoolReserved = await cherryswap.longPoolReserved.call();
      console.log(longPoolReserved.toString());

    });
    */
  });
  
  context("Create Position", async() => {
    let _longPositionSize = ether("30");

    it("create long position", async() => {
      await token.approve(cherryswap.address, _longPositionSize, { from: trader1 });
      await cherryswap.createLongPosition(_longPositionSize, 1, { from: trader1 });
    });
  });
  

});  