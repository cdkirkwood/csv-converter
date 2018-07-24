const over100 = (data, index) => 
  data.filter(row => +row[index] >= 100)

export default over100
