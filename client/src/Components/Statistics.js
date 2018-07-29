import React, { Component } from 'react'
import calcTotal from '../HelperFunctions/calcTotal'
import calcMean from '../HelperFunctions/calcMean'
import calcRange from '../HelperFunctions/calcRange'

export default class Stats extends Component {
  constructor(props) {
    super(props)
    this.state = {
      range: 0,
      total: 0,
      mean: 0,
      Intrange: 0,
      colIndex: '',
      data: [],
      valueOfColum: null
    }
  }

  componentDidMount() {
    const { data, colIndex } = this.props
    this.calcStats(data, colIndex)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.colIndex !== this.state.colIndex) {
      this.calcStats(this.state.data, this.state.colIndex)
    }
  }

  //if user switches column, we want stats to change
  static getDerivedStateFromProps(nextProps, prevState) {
    return nextProps.colIndex !== prevState.colIndex ?
      { colIndex: nextProps.colIndex }
      : null
  }

  calcStats(data, colIndex) {
    if (colIndex && isNaN(+data[0][colIndex])) {
      const range = `${data[0][colIndex]} - ${data[data.length - 1][colIndex]}`
      this.setState({ colIndex, data, range, valueOfColum: 'string' })
    }
    if (!isNaN(+data[0][colIndex])) {
      const total = calcTotal(data, colIndex)
      const mean = calcMean(total, data)
      const range = calcRange(data, colIndex)
      this.setState({ total, mean, range, colIndex, data, valueOfColum: 'number' })
    }
    else this.setState({ colIndex, data })
  }

  render() {
    const { data } = this.props
    const { total, mean, range, valueOfColum } = this.state
    switch (valueOfColum) {
      case 'number':
        return (
          <div className="stats">
            <h3>Total: {total}</h3>
            <h3>Mean: {mean}</h3>
            <h3>Range: {range}</h3>
            <h3>Count: {data.length}</h3>
          </div>
        )
      case 'string':
        return (
          <div>
            <h3>Range: {range}</h3>
            <h3>Count: {data.length}</h3>
          </div>
        )
      default:
        return <h3>Count: {data.length}</h3>
    }
  }
}

