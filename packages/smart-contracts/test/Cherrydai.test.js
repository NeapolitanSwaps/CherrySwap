const BigNumber = require("bignumber.js");
const EVMRevert = require("./helpers/EVMRevert").EVMRevert;

const ZERO_ADDR = "0x0000000000000000000000000000000000000000";

const CherryDai = artifacts.require("CherryDai");

require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

contract(
  "Cherry Dai",
  ([contractOwner, participant1, participant2, participant3, participant4, participant5, random]) => {
    const name = "Cherry Dai";
    const symbol = "CherryDAI";
    const decimals = 8;

    let cherryDai;

    before(async () => {
      cherryDai = await CherryDai.new({
        from: contractOwner
      });

      await cherryDai.initialize(contractOwner);
    });

    context("Deployment", async () => {
      it("check deployment", async () => {
        let tokenName = await cherryDai.name.call();
        let tokenSymbol = await cherryDai.symbol.call();
        let tokenDecimals = await cherryDai.decimals.call();
        let minter = await cherryDai.isMinter.call(contractOwner);
        assert.equal(tokenName, name);
        assert.equal(tokenSymbol, symbol);
        assert.equal(tokenDecimals, decimals);
        assert.equal(minter, true);
      });
    });

    context("Mint tokens", async () => {
      const supplyToMint = 500;

      it("should revert when minting token from address that have no permission", async () => {
        await cherryDai.mint(participant1, supplyToMint, { from: participant2 }).should.be.rejectedWith(EVMRevert);
      });

      it("mint supply", async () => {
        await cherryDai.mint(participant1, supplyToMint);
        let participant1Balance = await cherryDai.balanceOf(participant1);
        assert.equal(supplyToMint, participant1Balance.toNumber());
      });
    });

    context("Transfer token", async () => {
      const amountToTransfer = 150;

      it("should revert when sending token to address(0)", async () => {
        await cherryDai.transfer(ZERO_ADDR, amountToTransfer, { from: participant1 }).should.be.rejectedWith(EVMRevert);
      });

      it("transfer token", async () => {
        let participant1BalanceBefore = await cherryDai.balanceOf(participant1);
        await cherryDai.transfer(participant2, amountToTransfer, { from: participant1 });
        let participant1BalanceAfter = await cherryDai.balanceOf(participant1);
        let participant2Balance = await cherryDai.balanceOf(participant2);
        assert.equal(participant1BalanceBefore.toNumber() - amountToTransfer, participant1BalanceAfter.toNumber());
        assert.equal(amountToTransfer, participant2Balance.toNumber());
      });
    });
  }
);
