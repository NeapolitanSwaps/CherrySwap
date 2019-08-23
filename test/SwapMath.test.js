// Import all required modules from openzeppelin-test-helpers
const {
  BN,
  constants,
  expectEvent,
  expectRevert
} = require('openzeppelin-test-helpers');

// Import preferred chai flavor: both expect and should are supported
const {
  expect
} = require('chai');

const SwapMath = artifacts.require('SwapMath');

contract('SwapMath', ([sender, receiver]) => {
  beforeEach(async function () {
    console.log("intests!")
    this.swapMath = await SwapMath.new();
    let value = (await this.swapMath.getnum.call()).toString()
    console.log(value)
  });

  it('reverts when transferring tokens to the zero address', async function () {
    ///
  });
});