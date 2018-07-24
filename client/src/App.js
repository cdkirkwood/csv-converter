import React, { Component } from 'react'
import './App.css'
import { sortData, top25, bottom25, over100, under100, filterData, stringFilter } from './HelperFunctions'
import Table from './Components/Table'
import Stats from './Components/Statistics'
import Filters from './Components/Filters'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      csvTitles: [],
      fullData: [],
      selectedColIndex: '',
      selectedColType: '',
      filterStr: '',
      isFiltered: false,
      filteredData: [],
      startIndex: 0,
    }

    this.sortColumn = this.sortColumn.bind(this)
    this.applyStrFilter = this.applyStrFilter.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.applyIntFilter = this.applyIntFilter.bind(this)
    this.clearFilter = this.clearFilter.bind(this)
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

  sortColumn(evt, index) {
    const { fullData, filteredData, selectedColIndex, isFiltered } = this.state
    const data = isFiltered ? filteredData : fullData
    const colValue = data[0][index]
    const selectedColType = isNaN(+colValue) ? 'string' : 'number'
    const sortedData = sortData(data, index, selectedColIndex)
    isFiltered ?
      this.setState({ fullData: sortedData, selectedColIndex: index, selectedColType, startIndex: 0 })
      : this.setState({ filteredData: sortedData, selectedColIndex: index, selectedColType, startIndex: 0 })
  }

  applyStrFilter(evt) {
    const filterStr = evt.target.value
    const { fullData, selectedColIndex } = this.state
    const filteredData = stringFilter(fullData, filterStr, selectedColIndex)
    const isFiltered = !!filterStr
    this.setState({ filterStr, filteredData, startIndex: 0, isFiltered })
  }

  applyIntFilter(evt) {
    const { fullData, selectedColIndex } = this.state
    const filteredData = filterData(fullData, selectedColIndex, evt.target.name)
    this.setState({ filteredData, isFiltered: true, startIndex: 0 })
  }

  clearFilter() {
    this.setState({ isFiltered: false, startIndex: 0 })
  }


  nextPage() {
    const newIndex = this.state.startIndex + 20
    if (this.state.isFiltered && newIndex < this.state.filteredData.length) this.setState({ startIndex: newIndex })
    else if (!this.state.isFiltered && newIndex < this.state.fullData.length) this.setState({ startIndex: newIndex })
  }

  previousPage() {
    const newIndex = this.state.startIndex - 20
    if (newIndex >= 0) this.setState({ startIndex: newIndex })
  }

  render() {
    const { csvTitles, fullData, filterStr, filteredData, startIndex, selectedColIndex, selectedColType, isFiltered } = this.state
    return fullData.length ? (
      <div className="table-stats-container">
        <div className="table-input-container">
          <Table 
            titles={csvTitles} 
            isFiltered={isFiltered} 
            filteredData={filteredData} 
            fullData={fullData} 
            sortColumn={this.sortColumn} 
            startIndex={startIndex}
            dataType={selectedColType}
          />
          <div className="buttons">
            <button onClick={this.previousPage}>Previous</button>
            <button onClick={this.nextPage}>Next</button>
          </div>
        </div>
        <div className="stats-filters">
          <Stats data={fullData} colIndex={selectedColIndex} id='stats' />
          {selectedColIndex ?
            <Filters 
              data={fullData} 
              colIndex={selectedColIndex} 
              applyIntFilter={this.applyIntFilter} 
              filterStr={filterStr} 
              applyStrFilter={this.applyStrFilter} 
              selectedColType={selectedColType} 
              clearFilter={this.clearFilter}
              titles={csvTitles}
            />
            : null
          }
        </div>
      </div>
    )
      : <h3>...Loading</h3>
  }
}

export default App
