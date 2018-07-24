import ascendingSort from './ascendingSort'

const sortData = (data, index, lastSorted) => (
  lastSorted === index ?
    data.reverse()
    : ascendingSort(data, index)
  )

export default sortData