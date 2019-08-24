ln2: uint256

@public
def __init__():
  self.ln2 = 693147180559945

@public 
def getnum() -> uint256:
  return self.ln2

# @public
# def computeRatios(poolLong: uint256, poolShort: uint256, fixed: uint256, duration: uint256) -> uint256:
#   return self.ln2

# @public
# def expon(fixed: uint256, duration: uint256) -> uint256:
#   return 2 ** ((duration / 365 * fixed) / self.ln2) * 10 ** 18