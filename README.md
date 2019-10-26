# Cherryswap-monorepo

Cherry Swap is an autonomous, open-source platform for interest rate swaps on Compound Finance markets.

![](./additionalResources/ScreenImage2.png)

This repository contains the following apps:

- **[front-end](packages/front-end)**: Cherryswap interface
- **[smart-contracts](packages/smart-contracts)**: Cherryswap contracts
- **[swap-math](packages/swap-math)**: Cherryswap contracts for the swap model
- **[shared](packages/shared)**: Script package

## Links

Demo: https://cherryswap.now.sh

Devpost: https://devpost.com/software/cherry-swap

Smart Contracts:
* [SwapMath](https://kovan.etherscan.io/address/0x41c08aba8c295760d420d3de9a36003b9165607f)
* [CherrySwap](https://kovan.etherscan.io/address/0xCBDf18886896D236Ece8fA266015016f02c45aAf)

## How it works

Every market on Compound has an interest rate, which fluctuates according to supply and demand of credit and debt within that market. With Cherry Swap, users can hedge against these fluctuations - or speculate on them - by participating in pooled interest rate swaps.

With Cherry Swap, users predict interest rate trends and then commit funds into a fixed-term deposit into a Compound market, taking a position on future interest rates. Long positions gamble on the interest rate increasing, while short positions anticipate a decrease.

Any interest accrued while funds are locked up in Compound is pooled to be returned to participants at the end of the lock-up. Participants who predicted the correct trend in interest rates will earn more than they would have if they had invested directly into the Compound market.

## Our Team
* 🇿🇦 Chris Maree - Integrations
* 🇩🇪 Sabine Bertram - Vyper contracts
* 🇹🇳 Haythem Sellami - Solidity contracts
* 🇬🇧 Chris Fulford - Front-end development
* 🇳🇿 Liesl Eichholz - Design, UX/UI

## Technical Description

Individuals are able to jointly swap a fixed interest rate (in our case the observed interest rate per block on cDAI at time point `t_1`) with the floating interest per block of cDAI between `t_1` and `t_2`. Individual payouts at time `t_2` are dependent on the following ratios for long (swap fixed for float) and short (swap float for fixed) positions:

<a href="https://www.codecogs.com/eqnedit.php?latex=\\&space;r_l&space;=&space;\frac{P_{t_1^{s}}&space;\left(P_{t_2}&space;-&space;P_{t_1}\left(1&space;&plus;&space;\frac{i}{n}\right)^{n}\right)}{P_{t_1}^2}&space;\\&space;r_s&space;=&space;-&space;\frac{P_{t_1^{l}}&space;\left(P_{t_2}&space;-&space;P_{t_1}\left(1&space;&plus;&space;\frac{i}{n}\right)^{n}\right)}{P_{t_1}^2}&space;\\&space;\mathrm{where}&space;\\&space;P_{t_1^l}&space;&plus;&space;P_{t_1^s}&space;=&space;P_{t_1}&space;\\&space;P_{t_1^l}&space;\hspace{5mm}&space;\ldots&space;\hspace{5mm}&space;\textrm{pool&space;of&space;long&space;positions&space;at}&space;\hspace{2mm}&space;t_1\\&space;P_{t_1^s}&space;\hspace{5mm}&space;\ldots&space;\hspace{5mm}&space;\textrm{pool&space;of&space;short&space;positions&space;at}&space;\hspace{2mm}&space;t_1\\&space;P_{t_2}&space;\hspace{5mm}&space;\ldots&space;\hspace{5mm}&space;\textrm{pool&space;of&space;long&space;and&space;short&space;positions&space;at}&space;\hspace{2mm}&space;t_2\\&space;i&space;\hspace{9mm}&space;\ldots&space;\hspace{5mm}&space;\textrm{interest&space;rate&space;per&space;block&space;at}\hspace{2mm}&space;t_1\\&space;n&space;\hspace{8mm}&space;\ldots&space;\hspace{5mm}&space;\textrm{number&space;of&space;blocks&space;mined&space;between}\hspace{2mm}&space;t_1&space;\hspace{2mm}&space;\textrm{and}&space;\hspace{2mm}&space;t_2\\" target="_blank"><img src="https://latex.codecogs.com/gif.latex?\\&space;r_l&space;=&space;\frac{P_{t_1^{s}}&space;\left(P_{t_2}&space;-&space;P_{t_1}\left(1&space;&plus;&space;\frac{i}{n}\right)^{n}\right)}{P_{t_1}^2}&space;\\&space;r_s&space;=&space;-&space;\frac{P_{t_1^{l}}&space;\left(P_{t_2}&space;-&space;P_{t_1}\left(1&space;&plus;&space;\frac{i}{n}\right)^{n}\right)}{P_{t_1}^2}&space;\\&space;\mathrm{where}&space;\\&space;P_{t_1^l}&space;&plus;&space;P_{t_1^s}&space;=&space;P_{t_1}&space;\\&space;P_{t_1^l}&space;\hspace{5mm}&space;\ldots&space;\hspace{5mm}&space;\textrm{pool&space;of&space;long&space;positions&space;at}&space;\hspace{2mm}&space;t_1\\&space;P_{t_1^s}&space;\hspace{5mm}&space;\ldots&space;\hspace{5mm}&space;\textrm{pool&space;of&space;short&space;positions&space;at}&space;\hspace{2mm}&space;t_1\\&space;P_{t_2}&space;\hspace{5mm}&space;\ldots&space;\hspace{5mm}&space;\textrm{pool&space;of&space;long&space;and&space;short&space;positions&space;at}&space;\hspace{2mm}&space;t_2\\&space;i&space;\hspace{9mm}&space;\ldots&space;\hspace{5mm}&space;\textrm{interest&space;rate&space;per&space;block&space;at}\hspace{2mm}&space;t_1\\&space;n&space;\hspace{8mm}&space;\ldots&space;\hspace{5mm}&space;\textrm{number&space;of&space;blocks&space;mined&space;between}\hspace{2mm}&space;t_1&space;\hspace{2mm}&space;\textrm{and}&space;\hspace{2mm}&space;t_2\\" title="\\ r_l = \frac{P_{t_1^{s}} \left(P_{t_2} - P_{t_1}\left(1 + \frac{i}{n}\right)^{n}\right)}{P_{t_1}^2} \\ r_s = - \frac{P_{t_1^{l}} \left(P_{t_2} - P_{t_1}\left(1 + \frac{i}{n}\right)^{n}\right)}{P_{t_1}^2} \\ \mathrm{where} \\ P_{t_1^l} + P_{t_1^s} = P_{t_1} \\ P_{t_1^l} \hspace{5mm} \ldots \hspace{5mm} \textrm{pool of long positions at} \hspace{2mm} t_1\\ P_{t_1^s} \hspace{5mm} \ldots \hspace{5mm} \textrm{pool of short positions at} \hspace{2mm} t_1\\ P_{t_2} \hspace{5mm} \ldots \hspace{5mm} \textrm{pool of long and short positions at} \hspace{2mm} t_2\\ i \hspace{9mm} \ldots \hspace{5mm} \textrm{interest rate per block at}\hspace{2mm} t_1\\ n \hspace{8mm} \ldots \hspace{5mm} \textrm{number of blocks mined between}\hspace{2mm} t_1 \hspace{2mm} \textrm{and} \hspace{2mm} t_2\\" /></a>

Due to the pooling, we circumvent the market matching of individuals wanting to swap, however, the ratio of long and short positions increases the swap risk.

## Smart Contracts
Our code base consists of two main contract files: `Cherryswap.sol` and `SwapMath.vy`.

The `Cherryswap.sol` contract handles the different swap periods, which are fixed. A swap period consists of a collection phase `t1 - t0` and an active period `t2 - t1`. During the collection phase, participants are allowed to transfer DAI into either the long pool or the short pool. At `t1`,the start of the active period, the combined funds in the long and the short pool, `P_t1`, are converted into cDAI, where they are locked until `t2`. At that time, `P_t2` is split among the participants relative to their position and whether they were invested into the long or the short pool, and transferred back to them.

The `SwapMath.vy` contract serves as a library for the `CherrySwap.sol` contract and computes the payout ratios for long and short positions that are used to compute the payouts within the `Cherryswap.sol` contract.

## Development Setup

Node.js LTS or greater required.

```bash
# Bootstrap project dependencies:
$ yarn install

# Compile @smart-contracts 
$ yarn run contracts:compile

# Compile @swap-math
$ yarn run swapmath:compile

# Build @front-end
$ yarn run frontend:build

# Run solidity contracts tests
$ yarn run contracts:test

# Run swap math contracts tests
# To run the python test, see packages/swap-math/README.md
$ yarn run swapmath:test

# Run coverage
$ yarn run packageName:coverage

# current package name aliases: {frontend, contracts, swapmath}
```

## Deployment

Deploy the SwapMath contract:
```
yarn run swapmath:deploy
```

Copy the deployed address to the `@smart-contract` deployment config file 
```
packages/smart-contracts/migrations/config.json
```
If you are deploying on testnet or mainnet, make sure to config the ERC20 token and the ctoken addresses.


Deploy the solidity contracts:
```
yarn run contracts:deploy
```

Front end: 

! Needs to know the contract addresses
```
yarn run frontend:serve
```

## Additional Resources

* [Pitch Deck](./additionalResources/CherrySwapPitchDeck-ETHBerlinZwei.pdf)
* [Figma Mockups](https://www.figma.com/file/F5Ykz9BfmWO7YAwqLHUqJ2/Cherry-Swap-ETHBerlinZwei?node-id=0:1)
* [Formula Validation](https://docs.google.com/spreadsheets/d/1m6Dt99teQvEwX9UYqx_ONWNUgVn40_nJV4qQc6qyoWE/edit?usp=sharing)
