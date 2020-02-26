module.exports = {
  norpc: true,
  copyPackages: [],
  buildDirPath: "/build/contracts",
  testCommand:
    "ganache-cli --port 8555 --gasPrice 0x01 --gasLimit 0xfffffffffff > /dev/null & npm run compile && npm run link-dependencies && npm run push-project coverage && truffle test --network coverage",
  skipFiles: ["Migrations.sol"]
};
