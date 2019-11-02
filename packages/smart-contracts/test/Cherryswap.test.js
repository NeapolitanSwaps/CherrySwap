const {
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

  beforeEach(async function () {
    this.swapMath = await SwapmathContract.new({
      from: contractOwner
    });

    this.token = await TokenContract.new({
      from: contractOwner
    });

    this.cToken = await CTokenContract.new({
      from: contractOwner
    })

    // this.project = await TestHelper();

    // console.log("ADD", this.token.address, this.cToken.address, this.swapMath.address)

    // this.cherryswap = await this.project.createProxy(CherryswapContract);

    this.cherryswap = await CherryswapContract.new({
      from: contractOwner
    })

    await this.cherryswap.initialize(this.token.address, this.cToken.address, this.swapMath.address, {
      from: contractOwner
    })

    // Mint DAI for everyone
    this.token.mint(participant1, supplyToMint);
    this.token.mint(participant2, supplyToMint);
    this.token.mint(participant3, supplyToMint);
    this.token.mint(participant4, supplyToMint);
    this.token.mint(participant5, supplyToMint);
  });

  context("Deployment", async function () {
    it("check deployment", async function () {
      let swapsCounter = await this.cherryswap.swapsCounter.call();
      assert.equal(swapsCounter, _swapsCounter);
    });
  });

  context("Swap", async function () {
    it("create a swap", async function () {
      await this.cherryswap.createSwap(startingTime.toString(), endingTime.toString(), {
        from: participant1
      });

      _swapsCounter++;

      let swapsCounter = await this.cherryswap.swapsCounter.call();
      assert.equal(swapsCounter, _swapsCounter, "check swaps counter increased");
    });
    /*
        it("should revert when creating a swap while the previous one not closed", async() => {
          await cherryswap.methods.createSwap(startingTime, endingTime).should.be.rejectedWith(EVMRevert);
        });
    */
  });
  /*
    context("Market maker", async() => {
      let totalDepositedAmount = 0;
      let amountToDeposit = 100;

      it("Deposit into current opening swap", async() => {
        //aprove the contract to get token
        await token.methods.approve(cherryswap.address, amountToDeposit).send({from: participant1});
        await token.methods.approve(cherryswap.address, amountToDeposit).send({from: participant2});
        await token.methods.approve(cherryswap.address, amountToDeposit).send({from: participant3});

        await cherryswap.methods.deposit(participant1, amountToDeposit, 0).send({from: participant1});
        totalDepositedAmount += amountToDeposit;
        await cherryswap.methods.deposit(participant2, amountToDeposit, 0).send({from: participant2});
        totalDepositedAmount += amountToDeposit;
        await cherryswap.methods.deposit(participant3, amountToDeposit, 1).send({from: participant3});
        totalDepositedAmount += amountToDeposit;

        let participant1Balance = await token.methods.balanceOf(participant1).call();
        let participant2Balance = await token.methods.balanceOf(participant2).call();
        let participant3Balance = await token.methods.balanceOf(participant3).call();
        let cherryswapContractBalance = await token.methods.balanceOf(cherryswap.address).call();
        assert.equal(participant1Balance, supplyToMint-amountToDeposit);
        assert.equal(participant2Balance, supplyToMint-amountToDeposit);
        assert.equal(participant3Balance, supplyToMint-amountToDeposit);
        assert.equal(cherryswapContractBalance, totalDepositedAmount);
      });

      context("Start swap lock period", async() => {

        before(async() => {
          await increaseTimeTo(startingTime - 1);
          await cherryswap.methods.startSwap().send({from: owner});
        });

        it("check starting period", async() => {
          let daiAllowance = await token.methods.allowance(cherryswap.address, cToken.address).call();
          assert.equal(daiAllowance, totalDepositedAmount);
          let cDaiBalance = await cToken.methods.balanceOf(cherryswap.address).call();
          assert.equal(cDaiBalance, totalDepositedAmount);
        });

        it("should revert closing swap before ending time", async() => {
          await cherryswap.methods.closeSwap().send({from: owner}).should.be.rejectedWith(EVMRevert);
        });  

        it("should revert when depositing in locking period", async() => {
          await token.methods.approve(cherryswap.address, amountToDeposit).send({from: participant4});
          await increaseTimeTo(startingTime + 1);
          await cherryswap.methods.deposit(participant4, amountToDeposit, 1).send({from: participant4}).should.be.rejectedWith(EVMRevert);
        }); 

      });

      context("End swap period", async() => {

        before(async() => {
          await increaseTimeTo(endingTime + 3600);
          await cherryswap.methods.closeSwap().send({ from: owner });
        });

        it("Check redeemed DAI", async() => {
          let participant1Balance = await token.balanceOf(participant1);
          let participant2Balance = await token.balanceOf(participant2);
          let participant3Balance = await token.balanceOf(participant3);
        });        
      });

    });
  */
});