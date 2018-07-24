const under100 = (data, index) => 
  data.filter(row => +row[index] < 100)

export default under100