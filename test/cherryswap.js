/*eslint-disable */
const { TestHelper } = require('@openzeppelin/cli');
const { Contracts, ZWeb3 } = require('@openzeppelin/upgrades');
const BigNumber = require('bignumber.js');
const EVMRevert = require('./helpers/EVMRevert').EVMRevert;
const increaseTime = require('./helpers/increaseTime');
const increaseTimeTo = increaseTime.increaseTimeTo;

ZWeb3.initialize(web3.currentProvider);

const cherryswapContract = Contracts.getFromLocal("Cherryswap");
const tokenContract = Contracts.getFromLocal("TokenMock");
const cTokenContract = Contracts.getFromLocal("CTokenMock");

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

    this.project = await TestHelper({from: owner});
    
    token = await this.project.createProxy(tokenContract);
    cToken = await this.project.createProxy(cTokenContract);
    cherryswap = await this.project.createProxy(cherryswapContract, {
      initMethod: 'initialize',
      initArgs: [token.address, cToken.address, "0x0000000000000000000000000000000000000000"]
    });
  
    // Mint DAI for everyone
    token.methods.mint(participant1, supplyToMint);
    token.methods.mint(participant2, supplyToMint);
    token.methods.mint(participant3, supplyToMint);
    token.methods.mint(participant4, supplyToMint);
    token.methods.mint(participant5, supplyToMint);
  });

  describe("Deployment", async() => {
    it("check deployment", async() => {
      let swapsCounter = await cherryswap.methods.swapsCounter().call();
      assert.equal(swapsCounter, _swapsCounter);
    });
  });

  describe("Swap", async() => {
    it("create a swap", async() => {
      _swapsCounter++;

      await cherryswap.methods.createSwap(startingTime, endingTime).send({from: owner});
      
      let swapsCounter = await cherryswap.methods.swapsCounter().call();
      assert.equal(swapsCounter, _swapsCounter, "check swaps counter increased");
    });

    /*it("should revert when creating a swap while the previous one not closed", async() => {
      await cherryswap.methods.createSwap(startingTime, endingTime).should.be.rejectedWith(EVMRevert);
    });*/

  });

  describe("Market maker", async() => {
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

    describe("Start swap lock period", async() => {

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
/*
      it("should revert closing swap before ending time", async() => {
        await cherryswap.methods.closeSwap().send({from: owner}).should.be.rejectedWith(EVMRevert);
      });  

      it("should revert when depositing in locking period", async() => {
        await token.methods.approve(cherryswap.address, amountToDeposit).send({from: participant4});
        await increaseTimeTo(startingTime + 1);
        await cherryswap.methods.deposit(participant4, amountToDeposit, 1).send({from: participant4}).should.be.rejectedWith(EVMRevert);
      }); 
*/
    });
/*
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
*/
  });

});