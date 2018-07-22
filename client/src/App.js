import React, { Component } from 'react';
import './App.css';
import SingleRow from './SingleRow'
import sortData from './sortData'
import Table from './Table'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      csvTitles: [],
      fullData: [],
      lastSorted: '',
      filterStr: '',
      filteredData: []
    }

    this.sortColumn = this.sortColumn.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    //fetching csv json from server
    fetch('/api/csv')
      .then(res => res.json())
      .then(data => this.setState({ csvTitles: data[0], fullData: data.slice(1, data.length - 1) }))
  }

  sortColumn(evt, index) {
    const data = this.state.fullData
    const title = this.state.csvTitles[index]
    const sortedData = sortData(data, index, title, this.state.lastSorted)
    this.setState({ fullData: sortedData, lastSorted: title })
  }

  handleChange(evt) {
    const filterStr = evt.target.value
    const filteredData = this.state.fullData.filter(row => {
      return row.find(str => str.toLowerCase().includes(filterStr.toLowerCase()))
    })
    this.setState({ filterStr, filteredData })
  }

  render() {
    const {csvTitles, fullData, filterStr, filteredData} = this.state
    return fullData.length ? (
      <div>
        <input type="text" name={filterStr} value={filterStr} onChange={this.handleChange} />
        <Table titles={csvTitles} filterStr={filterStr} filteredData={filteredData} fullData={fullData} sortColumn={this.sortColumn} />
      </div>
    )
      : <h3>...Loading</h3>
  }
}

export default App
