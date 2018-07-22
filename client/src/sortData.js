const sortData = (data, index, title, lastSorted) => (
  lastSorted === title ?
    data.reverse()
    : data.sort((a, b) => {
      if (a[index] > b[index]) return 1
      if (a[index] < b[index]) return -1
      else return 0
    })
  )

export default sortData