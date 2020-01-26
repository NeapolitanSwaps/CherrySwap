# Cherryswap-monorepo [![CircleCI](https://circleci.com/gh/NeapolitanSwaps/CherrySwap/tree/master.svg?style=svg)](https://circleci.com/gh/NeapolitanSwaps/CherrySwap/tree/master) [![Build Status](https://travis-ci.com/NeapolitanSwaps/CherrySwap.svg?branch=master)](https://travis-ci.com/NeapolitanSwaps/CherrySwap)

Cherry Swap is an autonomous, open-source platform for interest rate swaps on Compound Finance markets.

![](./additionalResources/ScreenImage2.png)

This monorepo contains the following packages:

- **[front-end](packages/front-end)**: Cherryswap interface
- **[smart-contracts](packages/smart-contracts)**: Cherryswap V2 contracts
- **[shared](packages/shared)**: Scripts package

## Table of Contents

- [Links](#links)
- [How It Works](#how-it-works)
- [Our Team](#our-team)
- [Technical Description](#technical-description)
- [Networks](#networks)
  - [Testnets](#testnets)
    - [Kovan Testnet](#kovan-testnet)
  - [Mainnets](#mainnets)
    - [Ethereum Mainnet](#ethereum-mainnet)
- [Local development](#local-development)
    - [Testing](#testing)
    - [Code Linting](#code-linting)
- [Deployment](#deployment)
- [Issues](#issues)
- [Additional Resources](#additional-resources)
- [License](#license)

---

## Links

[Cherryswap V2 Paper:Double bonding curve liquidity pool as an automatic swap market maker](https://www.notion.so/neapolitan/Double-bonding-curve-liquidity-pool-as-an-automatic-swap-market-maker-e6f2eb5001244ed89832789e07e1ca71)

## How It Works

## Our Team

* 🇿🇦 Chris Maree - Integrations
* 🇩🇪 Sabine Bertram - Vyper contracts
* 🇹🇳 Haythem Sellami - Solidity contracts
* 🇬🇧 Chris Fulford - Front-end development
* 🇳🇿 Liesl Eichholz - Design, UX/UI

## Technical Description

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

## Local Development

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