import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      csvTitles: [],
      csvData: []
    }

    this.sortColumn = this.sortColumn.bind(this)
    this.sortData = this.sortData.bind(this)
    //this.sortIntData = this.sortIntData.bind(this)
  }

  componentDidMount() {
    //fetching csv json from server
    fetch('/api/csv')
      .then(res => res.json())
      .then(data => this.setState({ csvTitles: data[0], csvData: data.slice(1, data.length - 1) }))
  }

  sortColumn(evt, index) {
    const data = this.state.csvData
    const title = this.state.csvTitles[index]
    const isString = isNaN(data[0][index])
    // const sortedData = isString ? this.sortData(data, index) : this.sortIntData(data, index)
    const sortedData = this.sortData(data, index)
    //const sortedKey = 'is' + title + 'Sorted'
    //need to somehow keep track of if the column is already sorted
    this.setState({csvData: sortedData})
  }

  sortData(data, index) {
    return data.sort((a, b) => {
      if (a[index] > b[index]) return 1
      if (a[index] < b[index]) return -1
      else return 0
    })
  }

  // sortIntData(data) {
  //   return data.sort((a, b) => a - b)
  // }

  render() {
    const titles = this.state.csvTitles
    const data = this.state.csvData
    return data.length ? (
      <table>
        <tbody>
          <tr>
            <th>Row</th>
            {titles.map((column, colindex) => (
              <th key={colindex}><button onClick={(evt => this.sortColumn(evt, colindex))}>{column}</button></th>
            ))}
          </tr>
          {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td>{rowIndex + 1}</td>
                {row.map((dataValue, innerIndx) => (
                  <td key={innerIndx}>{dataValue}</td>
                ))}
              </tr>
            )
          )}
        </tbody>
      </table>
    )
      : <h3>...Loading</h3>
  }
}

export default App;
