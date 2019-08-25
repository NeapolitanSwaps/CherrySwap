// Import all required modules from openzeppelin-test-helpers
/*const {
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
const solidityTest = artifacts.require('SolidityTest');

contract('SwapMath', ([sender, receiver]) => {
  beforeEach(async function () {
    console.log("intests!")
    this.swapMath = await SwapMath.new();
    console.log("address")
    console.log(this.swapMath.address)
    let value = (await this.swapMath.getnum.call()).toString()
    console.log("vyper value:", value)  

    this.solidityTest = await solidityTest.new(this.swapMath.address)
    let value2 = (await this.solidityTest.get.call()).toString()
    console.log("Solidity value:", value2)

    let value3 = (await this.solidityTest.getVyper.call()).toString()
    console.log("vyper from solidity value:", value3)


  });

  it('reverts when transferring tokens to the zero address', async function () {
    ///
  });
});*/