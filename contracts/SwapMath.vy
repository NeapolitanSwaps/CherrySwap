ln2: decimal

@public
def __init__():
  self.ln2 = 0.6931471806

@public 
def getnum() -> uint256:
  return convert(self.ln2 * 10000000000.0, uint256)

@public
def blockCompound(fixed: uint256, t1: uint256, t2: uint256) -> decimal:
  blocks: uint256 = (t2 - t1) / 15
  precisionLoss: uint256 = 5
  scaling: uint256 = 10 ** (9 - precisionLoss)
  bracket: uint256 = convert((1.0 + (convert(fixed, decimal)/10000.0)/convert(blocks, decimal)) * convert(scaling, decimal), uint256)
  compound: decimal = convert(bracket ** blocks, decimal) / convert(scaling ** blocks, decimal)
  return compound

@public
def interestDiffScaled(poolStart: uint256, poolEnd: uint256, fixed: uint256, t1: uint256, t2: uint256) -> int128:
  compound: decimal = self.blockCompound(fixed, t1, t2)
  diff: int128 = convert(poolEnd * 10**10, int128) - convert(convert(poolStart * 10**10, decimal) * compound, int128)
  return diff

@public
def computeRatios(poolLong: uint256, poolShort: uint256, fixed: uint256, t1: uint256, t2: uint256, poolEnd: uint256) -> (int128, int128):
  poolStart: uint256 = poolLong + poolShort
  poolStartSquared: uint256 = poolStart ** 2
  scaleLong: decimal = convert(poolShort, decimal) / convert(poolStartSquared, decimal)
  scaleShort: decimal = convert(poolLong, decimal) / convert(poolStartSquared, decimal)
  diffScaled: int128 = self.interestDiffScaled(poolStart, poolEnd, fixed, t1, t2)
  ratioLong: int128
  ratioShort: int128
  if diffScaled > 0:
    ratioLong = convert(scaleLong * convert(diffScaled, decimal), int128)
    ratioShort = -1 * convert(scaleShort * convert(diffScaled, decimal), int128)
  else:
    ratioLong = -1 * convert(scaleLong * convert(-1 * diffScaled, decimal), int128)
    ratioShort = convert(scaleShort * convert(-1 * diffScaled, decimal), int128)
  return (ratioLong, ratioShort)