const stringFilter = (data, filterStr, selectedColIndex) =>
  data.filter(row =>
    row[selectedColIndex].toLowerCase().includes(filterStr.toLowerCase())
  )

export default stringFilter
