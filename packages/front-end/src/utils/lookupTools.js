const getNetIdString = () => {
    return window.web3.eth.net.getId()
        .then((id) => {
            switch (id) {
                case 1:
                    return 'Main Ethereum Network';
                case 3:
                    return 'Ropsten Ethereum Test Network';
                case 4:
                    return 'Rinkeby Ethereum Test Network';
                case 42:
                    return 'Kovan Ethereum Test Network';
                case 'loading':
                    return 'loading..';
                    // Will be some random number when connected locally
                default:
                    return 'Local Test Network';
            }
        });
};

const getEtherscanAddress = () => {
    return window.web3.eth.net.getId()
        .then((id) => {
            switch (id) {
                case 1:
                    return 'https://etherscan.io';
                case 3:
                    return 'https://ropsten.etherscan.io';
                case 4:
                    return 'https://rinkeby.etherscan.io';
                case 42:
                    return 'https://kovan.etherscan.io';
                default:
                    return 'http://localhost';
            }
        })
        .then((etherScanAddress) => {
            console.log(`Setting etherscan address as ${etherScanAddress}`);
            return etherScanAddress;
        });
};

module.exports = {
    getEtherscanAddress,
    getNetIdString,
};