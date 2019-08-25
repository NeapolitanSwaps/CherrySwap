/*eslint-disable */
const cherryswapContract = artifacts.require("Cherryswap");
const swapmathContract = artifacts.require("SwapMath");
const tokenContract = artifacts.require("TokenMock");
const cTokenContract = artifacts.require("CTokenMock");
const BigNumber = require('bignumber.js');
const EVMRevert = require('./helpers/EVMRevert').EVMRevert;
const latestTime  = require('./helpers/latestTime').latestTime;
const increaseTime = require('./helpers/increaseTime');
const increaseTimeTo = increaseTime.increaseTimeTo;
const duration = increaseTime.duration;
const getBalance = require('./helpers/web3').ethGetBalance
const assertRevert = require('./helpers/assertRevert').assertRevert

const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

contract('Cherryswap contract', (accounts) => {
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

  let startingTime = 1567018293000; // 28 august
  let endingTime = 1567018353;   // 28 august + 1 min

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
    token.mint(participant1, 500);
    token.mint(participant2, 500);
    token.mint(participant3, 500);
    token.mint(participant4, 500);
    token.mint(participant5, 500);
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

    it("Deposit into current opening swap", async() => {
      //aprove the contract to get token
      await token.approve(cherryswap.address, 100, {from: participant1});
      await token.approve(cherryswap.address, 100, {from: participant2});
      await token.approve(cherryswap.address, 100, {from: participant3});

      await cherryswap.deposit(participant1, 100, 0, {from: participant1});
      await cherryswap.deposit(participant2, 100, 0, {from: participant2});
      await cherryswap.deposit(participant3, 100, 1, {from: participant3});

      let participant1Balance = await token.balanceOf(participant1);
      let participant2Balance = await token.balanceOf(participant2);
      let participant3Balance = await token.balanceOf(participant3);
      let cherryswapContractBalance = await token.balanceOf(cherryswap.address);
      assert.equal(participant1Balance, 400);
      assert.equal(participant2Balance, 400);
      assert.equal(participant3Balance, 400);
      assert.equal(cherryswapContractBalance, 300);
    });

    describe("Start swap lock period", async() => {

      before(async() => {
        await increaseTimeTo(startingTime - 1);
        await cherryswap.startSwap();
      });

      it("check starting period", async() => {
        let daiAllowance = await token.allowance(cherryswap.address, cToken.address);
        assert.equal(daiAllowance, 300);
        let cDaiBalance = await cToken.balanceOf(cherryswap.address);
        assert.equal(cDaiBalance, 300);
      });

      it("should revert closing swap before ending time", async() => {
        await cherryswap.closeSwap({from: owner}).should.be.rejectedWith(EVMRevert);
      });  

      it("should revert when depositing in locking period", async() => {
        await token.approve(cherryswap.address, 50, {from: participant4});
        await increaseTimeTo(startingTime + 1);
        await cherryswap.deposit(participant4, 50, 1, {from: participant4}).should.be.rejectedWith(EVMRevert);
      }); 
      
    });

    describe("End swap period", async() => {

      before(async() => {
        await increaseTimeTo(endingTime + 1);
        await cherryswap.closeSwap();
      });

      it("should revert re-starting swap after starting time", async() => {
      });        
    });

  });

});