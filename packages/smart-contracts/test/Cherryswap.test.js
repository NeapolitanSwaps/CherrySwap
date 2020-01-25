const {
  BN,
  constants,
  expectEvent,
  expectRevert,
  ether
} = require("@openzeppelin/test-helpers");
const BigNumber = require('bignumber.js');
const EVMRevert = require('./helpers/EVMRevert').EVMRevert;
const truffleAssert = require('truffle-assertions');

//mock contracts
const TokenContract = artifacts.require("TokenMock");
const CTokenContract = artifacts.require("CTokenMock");

const CherryMathContract = artifacts.require("CherryMath");
const CherryDai = artifacts.require("CherryDai");
const CherryswapContract = artifacts.require("CherrySwap");

require('chai')
.use(require('chai-as-promised'))
.use(require('chai-bignumber')(BigNumber))
.should();

contract('Cherryswap contracts', ([contractOwner, provider1, provider2, provider3, trader1, trader2, trader3, random]) => {
  const supplyToMint = ether("500");

  let token, cToken, cherrymath, cherryDai, cherryswap;

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
    });

    cherryDai = await CherryDai.new({
      from: contractOwner
    }  
    );  

    await cherryswap.initialize(token.address, cToken.address, cherrymath.address, {
      from: contractOwner
    });

    await cherryDai.initialize(cherryswap.address);

    await cherryswap.setToken(cherryDai.address, {
      from: contractOwner
    });

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
      let minter = await cherryDai.isMinter.call(cherryswap.address);
      let poolBalance = await cherryswap.poolBalance.call();
      assert.equal(minter, true);
      assert.equal(poolBalance, 0);
    });
  });
  
  context("Deposit Liquidity", async() => {
    let _amountToDeposit = ether("100");

    it("should revert depositing into pool without approving tokens", async() => {
      await cherryswap.mint(_amountToDeposit, {from: provider1}).should.be.rejectedWith(EVMRevert);
    });

    it("deposit liquidity into the pool", async() => {
      let cherryDaiBalanceBefore = await cherryswap.cherryDaiBalanceOf(provider1);

      await token.approve(cherryswap.address, _amountToDeposit, {from: provider1});
      let tx = await cherryswap.mint(_amountToDeposit, {from: provider1});
 
      let cherryDaiBalanceAfter = await cherryswap.cherryDaiBalanceOf(provider1);

      assert.equal((await cherryswap.poolBalance()).toString(), _amountToDeposit, "Wrong pool balance");
      assert.equal((await cherryswap.longPoolBalance()).toString(), (await cherryswap.shortPoolBalance()).toString(), "Long and Short pool are not equal");
      assert.equal(cherryDaiBalanceAfter - cherryDaiBalanceBefore, await cherryDai.balanceOf(provider1), "Wrong CherryDai balance for provider");
      
      truffleAssert.eventEmitted(tx, 'CurrentExchangeRate', (ev) => {
        console.log("Dai=>CherryDai exchange rate: ", ev.rate.toString());
        assert.equal(cherryDaiBalanceAfter.toString(), _amountToDeposit * ev.rate, "Wrong minted amount of CherryDai for provider");
        return ev.rate;
      });

      console.log("Amount deposited: ", _amountToDeposit.toString());
      console.log("Amout of CherryDai minted for provider: ", cherryDaiBalanceAfter.toString());
      
    });
  });

  context("Create Position", async() => {
    let _longPositionSize = ether("30");

    it("create long position", async() => {
      let cherrswapCtokenBalanceBefore = await cToken.balanceOf(cherryswap.address);
      let longPoolReservedBefore = await cherryswap.longPoolReserved();

      await token.approve(cherryswap.address, _longPositionSize, { from: trader1 });
      await cherryswap.createLongPosition(_longPositionSize, { from: trader1 });

      let cherrswapCtokenBalanceAfter = await cToken.balanceOf(cherryswap.address);
      let longPoolReservedAfter = await cherryswap.longPoolReserved();
      let swapObject = await cherryswap.swaps(0);

      assert.equal(cherrswapCtokenBalanceAfter-_longPositionSize, cherrswapCtokenBalanceBefore, "Wrong minted amount of cToken");
      assert.equal(longPoolReservedAfter-longPoolReservedBefore, swapObject[7].toString(), "Wrong reserved amount for long position");
    });
  });

  /*context("Redeem CherryDai", async() => {
    let _amountToRedeem = ether("100");

    it("should revert redeeming an amount greater than the provider balance", async() => {
      await cherryswap.redeem(ether("200"), {from: provider1}).should.be.rejectedWith(EVMRevert);
    });

    it("redeem CherryDai", async() => {
      let poolBalanceBefore = await cherryswap.poolBalance();
      let cherryDaiBalanceBefore = await cherryswap.cherryDaiBalanceOf(provider1);

      await cherryDai.approve(cherryswap.address, cherryDaiBalanceBefore, {from: provider1});
      let tx = await cherryswap.redeem(_amountToRedeem, {from: provider1});

      let poolBalanceAfter = await cherryswap.poolBalance();
      let cherryDaiBalanceAfter = await cherryswap.cherryDaiBalanceOf(provider1);

      console.log("provider Cherrydai balance before: ", cherryDaiBalanceBefore.toString());
      console.log("provider Cherrydai balance after: ", cherryDaiBalanceAfter.toString());
      
      truffleAssert.eventEmitted(tx, 'CurrentExchangeRate', async (ev) => {
        console.log("exchange rate: ", ev.rate.toString());

        let _redeemAmount = await cherrymath.mulScalarTruncate(ev.rate, _amountToRedeem);

        //console.log(_redeemAmount[1].toString());
        //assert.equal(cherryDaiBalanceAfter-cherryDaiBalanceBefore, _redeemAmount[1], "Wrong amount of underlying asset for the amount of cToken");

        return ev.rate;
      });
    });
  });*/

});  