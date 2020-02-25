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
      token = await TokenContract.new({ from: contractOwner });
      cToken = await CTokenContract.new({ from: contractOwner });
      cherrymath = await CherryMathContract.new({ from: contractOwner });
      cherryswap = await CherryswapContract.new({ from: contractOwner });
      cherryDai = await CherryDai.new({ from: contractOwner });

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
        assert.equal(minter, true);

        let poolBalance = await cherryswap.poolBalance.call();

        assert.equal(poolBalance, 0);
      });
    });

    /*************************
     *    CHERRYPOOL TESTS   *
     *************************/

    context("Deposit Liquidity (CherryPool contract)", async () => {
      let _amountToDeposit = ether("100");

      it("Deposit liquidity into the pool(mint)👇", async () => {
        await token.approve(cherryswap.address, _amountToDeposit, {
          from: provider1
        });

        let poolcTokenBalanceBefore = await cToken.balanceOf(cherryswap.address);
        assert.equal(poolcTokenBalanceBefore, 0);

        let poolTokenBalanceBefore = await cToken.balanceOf(cherryswap.address);
        assert.equal(poolTokenBalanceBefore, 0);

        let longPoolReservedBefore = await cherryswap.longPoolReserved();
        assert.equal(longPoolReservedBefore, 0);

        let shortPoolReservedBefore = await cherryswap.shortPoolReserved();
        assert.equal(shortPoolReservedBefore, 0);

        let traderBalanceBefore = await token.balanceOf(provider1);
        assert.equal(traderBalanceBefore, supplyToMint);

        let compoundDaiBalanceBefore = await token.balancerOf(cToken.address)
        assert.equal(compoundDaiBalanceBefore, supplyToMint);

        // Mint tokens(deposit dai)
        await cherryswap.mint(_amountToDeposit, { from: provider1 });

        //Known assertions
        assert.equal((await cherryswap.poolBalance()).toString(), _amountToDeposit, "Wrong pool balance");
        assert.equal((await cherryswap.longPoolBalance()).toString(), 0, "Long pool is not empty");
        assert.equal(
          (await cherryswap.longPoolBalance()).toString(),
          (await cherryswap.shortPoolBalance()).toString(),
          "Long and Short pool are not equal"
        );

        //Relative state changes
        let poolcTokenBalanceAfter = await cToken.balanceOf(cherryswap.address);
        let expectedcTokenBalanceAfter = "";
        assert.equal(poolcTokenBalanceBefore - poolcTokenBalanceAfter, expectedcTokenBalanceAfter);

        let poolTokenBalanceAfter = await cToken.balanceOf(cherryswap.address);
        let expectedPoolTokenBalanceAfter = "";
        assert.equal(poolTokenBalanceAfter, poolTokenBalanceAfter);

        let longPoolReservedAfter = await cherryswap.longPoolReserved();
        let expectedLongPoolReservedAfter = "";
        assert.equal(longPoolReservedAfter, 0);

        let shortPoolReservedAfter = await cherryswap.shortPoolReserved();
        let expectedShortPoolReservedAfter = "";
        assert.equal(shortPoolReservedAfter, 0);

        let traderBalanceAfter = await token.balanceOf(provider1);
        let expectedSTraderBalanceAfter = "";
        assert.equal(traderBalanceAfter, supplyToMint);

        let compoundDaiBalanceBalanceAfter = await token.balancerOf(cToken.address);
        let expectedCompoundDaiBalanceBalanceAfter = "";
        assert.equal(compoundDaiBalanceBalanceAfter, expectedCompoundDaiBalanceBalanceAfter);
        
      });
      //TODO: check the Dai is deposited into compound

      //TODO: check the contract cDai balance has increased

      //TODO: look at the cherryDai balance and compare to what was expected based off calculation.

      //TODO: listen for event and check values are correct.
    });

    context("Redemption of CherryDai - no profit(CherryPool contract)", async () => {
      it("Long pool utilization", async () => {});
      it("Short pool utilization", async () => {});
    });

    /*************************
     *    CHERRYSWAP TESTS   *
     *************************/

    context("Swap pricing calculation Math (CherrySwap contract)", async () => {
      it("Correctly calculates the fixed rate offer given to swaps", async () => {});
      it("Correctly calculates the floating value", async () => {});
    });

    context("Create Position (CherrySwap contract)", async () => {
      let _longPositionSize = ether("30");

      it("create long position 🤥", async () => {
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
    context("Closing positions and associated payouts (CherrySwap contract)", async () => {
      it("Correctly sends the trader dai from a long position", async () => {});
      it("Correctly sends the trader dai from a short position", async () => {});
    });
    context("Rage quite and associated payouts (CherrySwap contract)", async () => {
      it("Trader can rage quite and get correct pay out", async () => {});
      it("Pool balance changes correctly after exit", async () => {});
    });

    /*************************
     *   INTEGRATION TESTS   *
     *************************/

    context("Correctly calculates pool utilization as positions are taken out(integration test)", async () => {
      it("Long pool utilization", async () => {});
      it("Short pool utilization", async () => {});
    });

    context("Redemption of CherryDai - generated profit(integration test)", async () => {
      it("Pays expected profit paid", async () => {
        //profit should be interest + "fees"
      });
      it("Short pool utilization", async () => {});
    });

    context("Redemption blocked when pools utilized(integration test)", async () => {
      it("Long Pool", async () => {
        //profit should be interest + "fees"
      });
      it("Short Pool", async () => {});
    });
  }
);
