import React, { Component } from 'react'
import './App.css'
import sortData from './sortData'
import Table from './Table'
import Stats from './Statistics'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      csvTitles: [],
      fullData: [],
      lastSorted: '',
      filterStr: '',
      filteredData: [],
      startIndex: 0,
    }

    this.sortColumn = this.sortColumn.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
  }

  componentDidMount() {
    //fetching csv json from server
    fetch('/api/csv')
      .then(res => res.json())
      .then(data => {
        const rows = data
          //csv file returns empty row at the end
          .slice(1, data.length - 1)
          //add origional position to each row
          .map((row, index) => [index + 1, ...row])
        this.setState({ csvTitles: ['Row', ...data[0]], fullData: rows })
      }
      )
  }

  handleChange(evt) {
    const filterStr = evt.target.value
    const filteredData = this.state.fullData.filter(row => {
      return row.find(((str, index) => (
        index > 0 ?
          str.toLowerCase().includes(filterStr.toLowerCase())
          : false
      )))

    })
    this.setState({ filterStr, filteredData, startIndex: 0 })
  }

  sortColumn(evt, index) {
    const data = this.state.fullData
    //const title = this.state.csvTitles[index]
    const sortedData = sortData(data, index, this.state.lastSorted)
    this.setState({ fullData: sortedData, lastSorted: index })
  }
  

  nextPage() {
    const newIndex = this.state.startIndex + 20
    if (this.state.filterStr && newIndex < this.state.filteredData.length) this.setState({ startIndex: newIndex })
    else if (!this.state.filterStr && newIndex < this.state.fullData.length) this.setState({ startIndex: newIndex })
  }

  previousPage() {
    const newIndex = this.state.startIndex - 20
    if (newIndex >= 0) this.setState({ startIndex: newIndex })
  }

  render() {
    const { csvTitles, fullData, filterStr, filteredData, startIndex, lastSorted } = this.state
    //console.log(this.state.lastSorted)
    return fullData.length ? (
      <div className="table-stats-container">
        <div className="table-input-container">
          <input type="text" name={filterStr} value={filterStr} onChange={this.handleChange} />
          <Table titles={csvTitles} filterStr={filterStr} filteredData={filteredData} fullData={fullData} sortColumn={this.sortColumn} startIndex={startIndex} />
          <div className="buttons">
            <button onClick={this.previousPage}>Previous</button>
            <button onClick={this.nextPage}>Next</button>
          </div>
        </div>
        <Stats data={fullData} colIndex={lastSorted} id='stats' />
      </div>
    )
      : <h3>...Loading</h3>
  }
}

export default App
