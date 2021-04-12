const getSizeFromList = (
  size: number,
  stepSize: number = 200,
  steps: number = 10
) => {
  const sizesList = Array(steps)
    .fill('')
    .map((_, i) => (i + 1) * stepSize)

  if (sizesList.find(step => step === size)) {
    return size
  }

  const firstSize = sizesList[0]
  if (size < firstSize) {
    return firstSize
  }

  const lastSize = sizesList[sizesList.length - 1]
  if (size > lastSize) {
    return lastSize
  }

  sizesList.push(size)
  const indexOfInputSize = sizesList.sort((a, b) => a - b).indexOf(size)
  const prevSize = sizesList[indexOfInputSize - 1]
  const followSize = sizesList[indexOfInputSize + 1]
  const diffWithPrevSize = size - prevSize
  const diffWithFollowSize = followSize - size

  return diffWithPrevSize < diffWithFollowSize ? prevSize : followSize
}

export default getSizeFromList
