import descendingSort from './descendingSort'

const top25 = (data, colIndex) => {
  const sortedData = descendingSort(data, colIndex)
  const lastIndex = Math.floor(data.length * .25)
  return sortedData.slice(0, lastIndex + 1)
}

export default top25

