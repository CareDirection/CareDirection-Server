exports.formulaForMyData = (x, recommendValue, highValue) => {
  if (highValue === -1) {
    if (recommendValue <= x) {
      return 100
    }
    return Math.floor(((3 * x) / recommendValue) * 10)

  }
  if (x > highValue) {
    return 110
  } if (recommendValue <= x && highValue >= x) {
    return Math.floor(((7 * (x - recommendValue)) / (highValue - recommendValue)) * 10 + 30)
  }
  return Math.floor(((3 * x) * recommendValue) * 10)
}
