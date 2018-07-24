const calcTotal = (data, index) =>
  data.reduce((total, row) => {
    return total + +row[index]
  }, 0)

export default calcTotal
