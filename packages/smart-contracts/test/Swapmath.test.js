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
let secondsPerYear = 60 * 60 * 24 * 365
let blocksPerYear = 4 * 60 * 24 * 365
let borrowRatePerBLock = 29482138861
let nominal = 100 * 10 ** 18

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
            assert(ratio.isGreaterThanOrEqualTo("0.999999999999999") && ratio.isLessThanOrEqualTo("1.000000000000001"), `Cap function incorrectly calculated`);
        })

    })
})