/*eslint-disable */
const cherryswapContract = artifacts.require("Cherryswap");
const swapmathContract = artifacts.require("SwapMath");
const tokenContract = artifacts.require("TokenMock");
const cTokenContract = artifacts.require("CTokenMock");
const BigNumber = require('bignumber.js');
const EVMRevert = require('./helpers/EVMRevert').EVMRevert;
const increaseTime = require('./helpers/increaseTime');
const increaseTimeTo = increaseTime.increaseTimeTo;

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

contract('Cherryswap contract', (accounts) => {
  const dayTime = 24 * 3600;
  const openingTime = Math.floor(Date.now() / 1000);
  const startingTime = openingTime + dayTime;
  const endingTime = startingTime + 90; // After 90seconds of starting time
  const supplyToMint = 500;
  
  let cherryswap;
  let swapmath;
  let token;
  let cToken;
  let owner;
  let participant1;
  let participant2;
  let participant3;
  let participant4;
  let participant5;
  let _swapsCounter = 0;

  before(async() => {
    owner = accounts[0];
    participant1 = accounts[1];
    participant2 = accounts[2];
    participant3 = accounts[3];
    participant4 = accounts[4];
    participant5 = accounts[5];

    token = await tokenContract.new({from: owner});
    cToken = await cTokenContract.new({from: owner});
    swapmath = await swapmathContract.new();
    cherryswap = await cherryswapContract.new(token.address, cToken.address, swapmath.address, {from: owner});
  
    // Mint DAI for everyone
    token.mint(participant1, supplyToMint);
    token.mint(participant2, supplyToMint);
    token.mint(participant3, supplyToMint);
    token.mint(participant4, supplyToMint);
    token.mint(participant5, supplyToMint);
  });

  describe("Deployment", async() => {
    it("check deployment", async() => {
      let swapsCounter = await cherryswap.swapsCounter();
      assert.equal(swapsCounter.toNumber(), _swapsCounter);
    });
  });

  describe("Swap", async() => {
    it("create a swap", async() => {
      let swapsCounterbefore = await cherryswap.swapsCounter();
      await cherryswap.createSwap(startingTime, endingTime, {from: owner});
      let swapsCounterAfter = await cherryswap.swapsCounter();
      assert.equal(swapsCounterAfter.toNumber() - swapsCounterbefore.toNumber(), 1, "check swaps counter increased");
    });

    it("should revert when creating a swap while the previous one not closed", async() => {
      await cherryswap.createSwap(startingTime, endingTime).should.be.rejectedWith(EVMRevert);
    });

  });

  describe("Market maker", async() => {
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

    describe("Start swap lock period", async() => {

      before(async() => {
        await increaseTimeTo(startingTime - 1);
        await cherryswap.startSwap();
      });

      it("check starting period", async() => {
        let daiAllowance = await token.allowance(cherryswap.address, cToken.address);
        assert.equal(daiAllowance, totalDepositedAmount);
        let cDaiBalance = await cToken.balanceOf(cherryswap.address);
        assert.equal(cDaiBalance, totalDepositedAmount);
      });

      it("should revert closing swap before ending time", async() => {
        await cherryswap.closeSwap({from: owner}).should.be.rejectedWith(EVMRevert);
      });  

      it("should revert when depositing in locking period", async() => {
        await token.approve(cherryswap.address, amountToDeposit, {from: participant4});
        await increaseTimeTo(startingTime + 1);
        await cherryswap.deposit(participant4, amountToDeposit, 1, {from: participant4}).should.be.rejectedWith(EVMRevert);
      }); 
      
    });

    describe("End swap period", async() => {

      before(async() => {
        await increaseTimeTo(endingTime + 3600);
        await cherryswap.closeSwap();
      });

      it("Check redeemed DAI", async() => {
        let participant1Balance = await token.balanceOf(participant1);
        let participant2Balance = await token.balanceOf(participant2);
        let participant3Balance = await token.balanceOf(participant3);
      });        
    });

  });

});