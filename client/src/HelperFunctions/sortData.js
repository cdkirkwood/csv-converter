import ascendingSort from './ascendingSort'

const sortData = (data, index, lastSorted, sortType) => (
  lastSorted === index ?
    sortType === 'Descending' ?
      //if data is already sorted, just reverse it
      [data.reverse(), 'Ascending']
      : [data.reverse(), 'Descending']

    : [ascendingSort(data, index), 'Ascending']
)

export default sortData