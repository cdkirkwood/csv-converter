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
    this.sortStringData = this.sortStringData.bind(this)
    this.sortIntData = this.sortIntData.bind(this)
  }

  componentDidMount() {
    //fetching csv json from server
    fetch('/api/csv')
      .then(res => res.json())
      .then(data => this.setState({ csvTitles: data[0], csvData: data.slice(1) }))
  }

  sortColumn(evt, index) {
    const data = this.state.csvData
    const isString = isNaN(data[0][index])
    const sortedData = isString ? this.sortStringData(data) : this.sortIntData(data)
    this.setState({csvData: sortedData})
  }

  sortStringData(data) {
    return data.sort()
  }

  sortIntData(data) {
    return data.sort((a, b) => a - b)
  }

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
