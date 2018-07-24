import ascendingSort from './ascendingSort'

const bottom25 = (data, index) => {
  const sortedData = ascendingSort(data, index)
  const lastIndex = Math.floor(data.length * .25)
  return sortedData.slice(0, lastIndex + 1)
}

export default bottom25