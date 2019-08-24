import pytest
import math

FIXED = 56257237401/(10**18)
FIXED_SCALED = 56257237401
T1 = 0
T2 = 90
POOL_LONG = 100
POOL_SHORT = 140
POOL_END = 300

BLOCKS = (T2 - T1) / 15
POOL_START = POOL_LONG + POOL_SHORT


@pytest.fixture
def swapMath_contract(w3, get_contract):
  with open('contracts/SwapMath.vy') as f:
    contract_code = f.read()
    contract = get_contract(contract_code)
  return contract

# def test_blockCompound(w3, swapMath_contract):
#   expected_compound = (1 + FIXED / BLOCKS) ** BLOCKS
#   contract_compound = swapMath_contract.blockCompound(FIXED_SCALED, T1, T2)
#   assert str(round(expected_compound, 10)) == str(contract_compound)

# def test_interestDiffScaled(w3, swapMath_contract):
#   expected_diff = POOL_END - POOL_START * (1 + FIXED / BLOCKS) ** BLOCKS
#   print(expected_diff)
#   expected_diff_scaled = math.floor(round(expected_diff, 7) * 10**7)
#   contract_diff = swapMath_contract.interestDiffScaled(POOL_START, POOL_END, FIXED_SCALED, T1, T2)
#   assert str(expected_diff_scaled) == str(math.floor(contract_diff/1000))

def test_computeRatios(w3, swapMath_contract):
  expected_ratio_long = POOL_SHORT / (POOL_START ** 2) * (POOL_END - POOL_START * ((1 + FIXED / BLOCKS) ** BLOCKS))
  expected_ratio_short = -1 * POOL_LONG / (POOL_START ** 2) * (POOL_END - POOL_START * ((1 + FIXED / BLOCKS) ** BLOCKS))
  contract_ratios = swapMath_contract.computeRatios(POOL_LONG, POOL_SHORT, FIXED_SCALED, T1, T2, POOL_END)
  assert str(round(expected_ratio_long, 5)) == str(round(contract_ratios[0] / 10**10, 5))
  assert str(round(expected_ratio_short, 5)) == str(round(contract_ratios[1] / 10**10, 5))
