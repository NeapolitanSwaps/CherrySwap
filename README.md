# Cherryswap-monorepo [![CircleCI](https://circleci.com/gh/NeapolitanSwaps/CherrySwap/tree/master.svg?style=svg)](https://circleci.com/gh/NeapolitanSwaps/CherrySwap/tree/master) [![Coverage Status](https://coveralls.io/repos/github/NeapolitanSwaps/CherrySwap/badge.svg?branch=master)](https://coveralls.io/github/NeapolitanSwaps/CherrySwap?branch=master)

Cherry Swap is an autonomous, open-source platform for interest rate swaps on Compound Finance markets.

![](./additionalResources/ScreenImage2.png)

## ETHBERLINZWEI Winners

- [TheBlock write up](https://www.theblockcrypto.com/genesis/38113/ethberlin-interest-rate-hackathon-projects)
- [Interest Rate Swaps Coming to DeFi with Cherry Swap](https://cryptobriefing.com/interest-rate-swaps-coming-defi-cherry-swap/)

## Table of Contents

- [Resources](#resources)
- [Our Team](#our-team)
- [Networks](#networks)
  - [Testnets](#testnets)
    - [Kovan Testnet](#kovan-testnet)
  - [Mainnets](#mainnets)
    - [Ethereum Mainnet](#ethereum-mainnet)
- [How It Works](#how-it-works)
- [Technical Description](#technical-description)
- [Local development](#local-development)
    - [Testing](#testing)
    - [Code Linting](#code-linting)
- [Deployment](#deployment)
- [Issues](#issues)
- [Additional Resources](#additional-resources)
- [License](#license)

---

## Resources

- [Cherryswap V2 Paper:Double bonding curve liquidity pool as an automatic swap market maker](https://www.notion.so/neapolitan/Double-bonding-curve-liquidity-pool-as-an-automatic-swap-market-maker-e6f2eb5001244ed89832789e07e1ca71)
- [Smart Contract Documentation](packages/docs/contract-specs/CherrySwap.md)

## Our Team

* 🇿🇦 Chris Maree - Integrations
* 🇩🇪 Sabine Bertram - Vyper contracts
* 🇹🇳 Haythem Sellami - Solidity contracts
* 🇬🇧 Chris Fulford - Front-end development
* 🇳🇿 Liesl Eichholz - Design, UX/UI

## Networks

### Testnets

#### Kovan Testnet

The contract addresses deployed on `Kovan` Test Network:

| Contract      | Address                                                                                                                       |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| CherryDai     | []()                                                                                                                          |
| CherryMath    | []()                                                                                                                          |
| CherrySwap    | []()                                                                                                                          |

### Mainnets

#### Ethereum Mainnet

The contract addresses deployed on `Mainnet` Mainnet:

| Contract      | Address                                                                                                                       |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| CherryDai     | []()                                                                                                                          |
| CherryMath    | []()                                                                                                                          |
| CherrySwap    | []()                                                                                                                          |

## How It Works

## Technical Description

## Local Development

This monorepo contains the following packages:

- **[front-end](packages/front-end)**: Cherryswap interface
- **[smart-contracts](packages/smart-contracts)**: Cherryswap V2 contracts
- **[shared](packages/shared)**: Scripts package

Node.js LTS or greater required.

```bash

# current package name aliases: {frontend, contracts}
```

### Testing

### Code Linting

Linting is setup for `JavaScript` with [ESLint](https://eslint.org) & Solidity with [Solhint](https://protofire.github.io/solhint/) and [Prettier](https://prettier.io/).

    # lint solidity contracts
    $ yarn run contracts:prettier

Code style is enforced through the CI test process, builds will fail if there're any linting errors.

## Deployment

## Issues

If you come across an issue with Cherryswap, do a search in the [Issues](https://github.com/NeapolitanSwaps/CherrySwap/issues) tab of this repo to make sure it hasn't been reported before. Follow these steps to help us prevent duplicate issues and unnecessary notifications going to the many people watching this repo:

- If the issue you found has been reported and is still open, and the details match your issue, give a "thumbs up" to the relevant posts in the issue thread to signal that you have the same issue. No further action is required on your part.
- If the issue you found has been reported and is still open, but the issue is missing some details, you can add a comment to the issue thread describing the additional details.
- If the issue you found has been reported but has been closed, you can comment on the closed issue thread and ask to have the issue reopened because you are still experiencing the issue. Alternatively, you can open a new issue, reference the closed issue by number or link, and state that you are still experiencing the issue. Provide any additional details in your post so we can better understand the issue and how to fix it.

## Additional Resources

* [Figma Mockups]()
* [Formula Validation]()

## License

MIT License

Copyright (c) 2019 NeapolitanSwaps

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
