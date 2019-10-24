# `@cherryswap/swap-math`

The `SwapMath.vy` contract serves as a library for the `CherrySwap.sol` contract and computes the payout ratios for long and short positions that are used to compute the payouts within the `Cherryswap.sol` contract.

## Environment

! Vyper requires at least Python 3.6 and the corresponding dev tools.
We are assuming you navigated to this directory.

```
python3 -m venv venv
. venv/bin/activate
```

Install the python and the node requirements:
```
pip install -r requirements.txt
yarn install
```

## Testing

Testing the vyper code:
```
python -m pytest --ignore node_modules
```
