/*const {
  BN,
  constants,
  expectEvent,
  expectRevert,
  ether
} = require("@openzeppelin/test-helpers");

const {
  TestHelper
} = require('@openzeppelin/cli');
const {
  Contracts,
  ZWeb3
} = require('@openzeppelin/upgrades');
const BigNumber = require('bignumber.js');
const EVMRevert = require('./helpers/EVMRevert').EVMRevert;
const increaseTime = require('./helpers/increaseTime');
const increaseTimeTo = increaseTime.increaseTimeTo;

ZWeb3.initialize(web3.currentProvider);

//cherryswap contracts
const SwapmathContract = artifacts.require("Swapmath");
const CherryswapContract = artifacts.require("Cherryswap");

//mock contracts
const TokenContract = artifacts.require("TokenMock");
const CTokenContract = artifacts.require("CTokenMock");


require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

contract('Cherryswap contract 🍒', ([contractOwner, participant1, participant2, participant3, participant4, participant5, random]) => {
  const dayTime = 24 * 3600;
  const openingTime = Math.floor(Date.now() / 1000);
  const startingTime = openingTime + dayTime;
  const endingTime = startingTime + 90; // After 90seconds of starting time
  const supplyToMint = ether("500");
  let _swapsCounter = 0;
  let swapMath;
  let token;
  let cToken;
  let cherryswap;

  before(async function () {
    swapMath = await SwapmathContract.new({
      from: contractOwner
    });

    token = await TokenContract.new({
      from: contractOwner
    });

    cToken = await CTokenContract.new({
      from: contractOwner
    })

    cherryswap = await CherryswapContract.new({
      from: contractOwner
    })

    await cherryswap.initialize(token.address, cToken.address, swapMath.address, {
      from: contractOwner
    })

    // Mint DAI for everyone
    token.mint(participant1, supplyToMint);
    token.mint(participant2, supplyToMint);
    token.mint(participant3, supplyToMint);
    token.mint(participant4, supplyToMint);
    token.mint(participant5, supplyToMint);
  });

  context("Deployment", async function () {
    it("check deployment", async function () {
      let swapsCounter = await cherryswap.swapsCounter.call();
      assert.equal(swapsCounter, _swapsCounter);
    });
  });

  context("Swap", async function () {
    it("create a swap", async function () {
      await cherryswap.createSwap(startingTime.toString(), endingTime.toString(), {
        from: contractOwner
      });

      _swapsCounter++;

      let swapsCounter = await cherryswap.swapsCounter.call();
      assert.equal(swapsCounter, _swapsCounter, "check swaps counter increased");
    });
    
    it("should revert when creating a swap while the previous one not closed", async() => {
      await cherryswap.createSwap(startingTime, endingTime).should.be.rejectedWith(EVMRevert);
    });
    
  });
  
  context("Market maker", async() => {
    let totalDepositedAmount = 0;
    let amountToDeposit = 100;

    it("Deposit into current opening swap", async() => {
      //aprove the contract to get token
      await token.approve(cherryswap.address, amountToDeposit, {from: participant1});
      await token.approve(cherryswap.address, amountToDeposit, {from: participant2});
      await token.approve(cherryswap.address, amountToDeposit, {from: participant3});

      await cherryswap.deposit(participant1, amountToDeposit, 0, {from: participant1});
      totalDepositedAmount += amountToDeposit;
      await cherryswap.deposit(participant2, amountToDeposit, 0, {from: participant2});
      totalDepositedAmount += amountToDeposit;
      await cherryswap.deposit(participant3, amountToDeposit, 1, {from: participant3});
      totalDepositedAmount += amountToDeposit;

      let participant1Balance = await token.balanceOf(participant1);
      let participant2Balance = await token.balanceOf(participant2);
      let participant3Balance = await token.balanceOf(participant3);
      let cherryswapContractBalance = await token.balanceOf(cherryswap.address);
      assert.equal(participant1Balance, supplyToMint-amountToDeposit);
      assert.equal(participant2Balance, supplyToMint-amountToDeposit);
      assert.equal(participant3Balance, supplyToMint-amountToDeposit);
      assert.equal(cherryswapContractBalance, totalDepositedAmount);
    });

    context("Start swap lock period", async() => {

      before(async() => {
        await increaseTimeTo(startingTime - 1);
        await cherryswap.startSwap({from: contractOwner});
      });

      it("check starting period", async() => {
        let daiAllowance = await token.allowance(cherryswap.address, cToken.address);
        assert.equal(daiAllowance, totalDepositedAmount);
        let cDaiBalance = await cToken.balanceOf(cherryswap.address);
        assert.equal(cDaiBalance, totalDepositedAmount);
      });

      it("should revert closing swap before ending time", async() => {
        await cherryswap.closeSwap({from: contractOwner}).should.be.rejectedWith(EVMRevert);
      });  

      it("should revert when depositing in locking period", async() => {
        await token.approve(cherryswap.address, amountToDeposit, {from: participant4});
        await increaseTimeTo(startingTime + 1);
        await cherryswap.deposit(participant4, amountToDeposit, 1, {from: participant4}).should.be.rejectedWith(EVMRevert);
      }); 

    });

    context("End swap period", async() => {

      before(async() => {
        await increaseTimeTo(endingTime + 3600);
        await cherryswap.closeSwap({ from: contractOwner });
      });

      it("Check redeemed DAI", async() => {
        let participant1Balance = await token.balanceOf(participant1);
        let participant2Balance = await token.balanceOf(participant2);
        let participant3Balance = await token.balanceOf(participant3);
      });        
    });

  });

});*/