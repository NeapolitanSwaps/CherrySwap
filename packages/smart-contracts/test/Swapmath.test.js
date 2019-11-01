// Import all required modules from openzeppelin-test-helpers
const {
    BN,
    constants,
    expectEvent,
    expectRevert,
    ether
} = require("openzeppelin-test-helpers");
const {
    expect
} = require("chai");

const BigNumber = require('bignumber.js');

// Contracts
const Swapmath = artifacts.require("SwapMath");

//constants
const secondsPerYear = 60 * 60 * 24 * 365
const blocksPerYear = 4 * 60 * 24 * 365
const nominal = ether("100")

//taken from chain to mimic exact return values
const borrowRatePerBLock = "29482138861"
const cDaiToDaiexchangeRate = "209991854974969165507257848"
const cDaiToDaiexchangeRate_Beginning = "200091854974969165507257848"

let Decimal = require("decimal.js");
Decimal.set({
    precision: 100,
    rounding: Decimal.ROUND_DOWN
});

MIN_PRECISION = 32;
MAX_PRECISION = 127;
let LOG_MIN = 1;
let EXP_MIN = 0;
let LOG_MAX = new BigNumber(Decimal.exp(1).toFixed());
let EXP_MAX = new BigNumber(Decimal.pow(2, 4).toFixed());
let FIXED_1 = new BigNumber(Decimal.pow(2, MAX_PRECISION).toFixed());

contract("SwapMath 🔬", ([contractOwner, random]) => {
    beforeEach(async function () {
        this.swapmath = await Swapmath.new({
            from: contractOwner
        })
    });
    context("Helper Maths", function () {
        it(`Exponentual calculation loop`, async function () {
            // loop over a range within the accessable range of the function from EXP_Min to EXP_MAX
            for (let percent = 0; percent < 10; percent++) {
                let x = (new BigNumber(percent)).dividedBy(100).times(EXP_MAX.minus(EXP_MIN)).plus(EXP_MIN);
                let fixedPoint = await this.swapmath.optimalExp.call(FIXED_1.times(x).toFixed(0));
                let floatPoint = new BigNumber(Decimal(x.toFixed()).exp().times(FIXED_1.toFixed()).toFixed());

                let ratio = new BigNumber(fixedPoint).dividedBy(floatPoint);
                assert(ratio.isGreaterThanOrEqualTo("0.999999999999999") && ratio.isLessThanOrEqualTo("1.000000000000001"), `ratio = ${ratio.toFixed()}`);
            }
        });

        it("Can correctly find capatalization function", async function () {
            let expectedValue = new BigNumber(Math.exp((borrowRatePerBLock / 10 ** 18) * blocksPerYear) * 10 ** 18)
            let contractValue = await this.swapmath.capFunction.call(borrowRatePerBLock, 0, secondsPerYear);
            let ratio = new BigNumber(expectedValue).dividedBy(contractValue);
            assert(ratio.isGreaterThanOrEqualTo("0.999999999999999") && ratio.isLessThanOrEqualTo("1.000000000000001"), `Cap function incorrectly calculated`);
        })

        it("Can correctly calculate future value of NACC position", async function () {
            let capFunction = new BigNumber(Math.exp((borrowRatePerBLock / 10 ** 18) * blocksPerYear))
            let expectedValue = capFunction.multipliedBy(nominal)
            let contractValue = await this.swapmath.futureValue.call(nominal.toString(), borrowRatePerBLock, 0, secondsPerYear);
            let ratio = new BigNumber(expectedValue).dividedBy(contractValue);
            assert(ratio.isGreaterThanOrEqualTo("0.999999999999999") && ratio.isLessThanOrEqualTo("1.000000000000001"), `NACC position incorrectly calculated`);
        })

        it("Correctly convert from cDai to Dai", async function () {
            //note that here we use nominal as the input. this is irrelevant as to what the number is
            let expectedValue = (new BigNumber(cDaiToDaiexchangeRate)).multipliedBy(nominal).dividedBy((new BigNumber(10).pow(28)))
            let contractValue = await this.swapmath.cDaitoDai.call(nominal, cDaiToDaiexchangeRate);
            let ratio = new BigNumber(expectedValue).dividedBy(contractValue);
            assert(ratio.isGreaterThanOrEqualTo("0.999999999999999") && ratio.isLessThanOrEqualTo("1.000000000000001"), `cDai to Dai conversion incorrectly`);
        })
    })

    context("Ratio Calculation", function () {
        it("Correctly calculate ratio split between long and short sides", async function () {
            //create two pools of differing sizes. this will be difined by market forces and people's appetite for swaps
            let longPool = ether("110")
            let shortPool = ether("90")
            
            // the short side value is simply the underling short pool grown by the fixed rate defined at the start
            // over the duration of the swap
            let shortCapFunction = new BigNumber(Math.exp((borrowRatePerBLock / 10 ** 18) * blocksPerYear))
            let shortExpectedValue = shortCapFunction.multipliedBy(shortPool)

            // the long side value is found by taking the total pool grown over the duration - the short side pool.
            // this is found by first converting the total nominal at beginning to cDai using the starting rate and then
            // converting it back using the ending rate.
            let totalPoolcDaiValueBeginning = (new BigNumber(longPool)).plus(shortPool).multipliedBy((new BigNumber(10).pow(28))).dividedBy(cDaiToDaiexchangeRate_Beginning)
            let totalPoolDaiValueEnd = totalPoolcDaiValueBeginning.multipliedBy(cDaiToDaiexchangeRate).dividedBy((new BigNumber(10).pow(28)))

            let longExpectedValue = totalPoolDaiValueEnd.minus(shortExpectedValue)

            let contractReturned = await this.swapmath.computeRatios.call(totalPoolcDaiValueBeginning.toFixed(0), shortPool, borrowRatePerBLock, 0, secondsPerYear, cDaiToDaiexchangeRate);
            let contractLong = contractReturned[0]
            let contractShort = contractReturned[1]

            let ratioLong = new BigNumber(longExpectedValue).dividedBy(contractLong);
            assert(ratioLong.isGreaterThanOrEqualTo("0.999999999999999") && ratioLong.isLessThanOrEqualTo("1.000000000000001"), `Funds split incorrectly long side`);

            let ratioShort = new BigNumber(shortExpectedValue).dividedBy(contractShort);
            assert(ratioShort.isGreaterThanOrEqualTo("0.999999999999999") && ratioShort.isLessThanOrEqualTo("1.000000000000001"), `Funds split incorrectly short side`);
        })
    })
})