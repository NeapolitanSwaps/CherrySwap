const { BN, constants, expectEvent, expectRevert, ether } = require("@openzeppelin/test-helpers");
const BigNumber = require("bignumber.js");
const EVMRevert = require("./helpers/EVMRevert").EVMRevert;

//mock contracts
const TokenContract = artifacts.require("TokenMock");
const CTokenContract = artifacts.require("CTokenMock");

const CherryMathContract = artifacts.require("CherryMath");
const CherryDai = artifacts.require("CherryDai");
const CherryswapContract = artifacts.require("CherrySwap");

require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

contract(
  "Cherryswap contracts",
  ([contractOwner, provider1, provider2, provider3, trader1, trader2, trader3, random]) => {
    const supplyToMint = ether("500");

    let token, cToken, cherrymath, cherryDai, cherryswap;

    before(async function() {
      token = await TokenContract.new({
        from: contractOwner
      });

      cToken = await CTokenContract.new({
        from: contractOwner
      });

      cherrymath = await CherryMathContract.new({
        from: contractOwner
      });

      cherryswap = await CherryswapContract.new({
        from: contractOwner
      });

      cherryDai = await CherryDai.new({
        from: contractOwner
      });

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

    context("Deployment", async function() {
      it("check deployment", async function() {
        let minter = await cherryDai.isMinter.call(cherryswap.address);
        let poolBalance = await cherryswap.poolBalance.call();
        assert.equal(minter, true);
        assert.equal(poolBalance, 0);
      });
    });

    context("Deposit Liquidity", async () => {
      let _amountToDeposit = ether("100");

      it("Deposit liquidity into the pool", async () => {
        await token.approve(cherryswap.address, _amountToDeposit, { from: provider1 });
        await cherryswap.mint(_amountToDeposit, { from: provider1 });

        assert.equal((await cherryswap.poolBalance()).toString(), _amountToDeposit, "Wrong pool balance");
        assert.equal(
          (await cherryswap.longPoolBalance()).toString(),
          (await cherryswap.shortPoolBalance()).toString(),
          "Long and Short pool are not equal"
        );
      });
    });

    context("Create Position", async () => {
      let _longPositionSize = ether("30");

      it("create long position", async () => {
        let cherrswapCtokenBalanceBefore = await cToken.balanceOf(cherryswap.address);
        let longPoolReservedBefore = await cherryswap.longPoolReserved();

        await token.approve(cherryswap.address, _longPositionSize, { from: trader1 });
        await cherryswap.createLongPosition(_longPositionSize, { from: trader1 });

        let cherrswapCtokenBalanceAfter = await cToken.balanceOf(cherryswap.address);
        let longPoolReservedAfter = await cherryswap.longPoolReserved();
        let swapObject = await cherryswap.swaps(0);

        assert.equal(
          cherrswapCtokenBalanceAfter - _longPositionSize,
          cherrswapCtokenBalanceBefore,
          "Wrong minted amount of cToken"
        );
        assert.equal(
          longPoolReservedAfter - longPoolReservedBefore,
          swapObject[7].toString(),
          "Wrong reserved amount for long position"
        );
      });
    });
  }
);
