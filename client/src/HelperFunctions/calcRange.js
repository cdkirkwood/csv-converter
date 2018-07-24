const calcRange = (data, index) => Math.abs(+data[0][index] - +data[data.length - 1][index])

export default calcRange