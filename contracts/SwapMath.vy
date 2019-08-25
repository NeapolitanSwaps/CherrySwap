@private
@constant
def blockCompound(fixedRate: uint256, t1: uint256, t2: uint256) -> decimal:
  blocks: uint256 = (t2 - t1) / 15
  precisionLoss: uint256 = 1
  bracket: uint256 = 10 ** 10 + fixedRate / (blocks * 10**8)
  upper: uint256 = (bracket ** blocks) / 10**30
  lower: uint256 = 10000000000 ** blocks / 10**30
  compound: decimal = convert(upper, decimal) / convert(lower, decimal)
  return compound

@private
@constant
def interestDiffScaled(poolStart: uint256, poolEnd: uint256, fixedRate: uint256, t1: uint256, t2: uint256) -> int128:
  compound: decimal = self.blockCompound(fixedRate, t1, t2)
  diff: int128 = convert(poolEnd * 10**10, int128) - convert(convert(poolStart * 10**10, decimal) * compound, int128)
  return diff

@public
@constant
def computeRatios(poolLong: uint256, poolShort: uint256, fixedRate: uint256, t1: uint256, t2: uint256, poolEnd: uint256) -> (int128, int128):
  poolStart: uint256 = poolLong + poolShort
  poolStartSquared: uint256 = poolStart ** 2
  scaleLong: decimal = convert(poolShort, decimal) / convert(poolStartSquared, decimal)
  scaleShort: decimal = convert(poolLong, decimal) / convert(poolStartSquared, decimal)
  diffScaled: int128 = self.interestDiffScaled(poolStart, poolEnd, fixedRate, t1, t2)
  ratioLong: int128
  ratioShort: int128
  if diffScaled > 0:
    ratioLong = convert(scaleLong * convert(diffScaled, decimal), int128)
    ratioShort = -1 * convert(scaleShort * convert(diffScaled, decimal), int128)
  else:
    ratioLong = -1 * convert(scaleLong * convert(-1 * diffScaled, decimal), int128)
    ratioShort = convert(scaleShort * convert(-1 * diffScaled, decimal), int128)
  return (ratioLong, ratioShort)