import React, { Component } from 'react'
import './App.css'
import { sortData, filterData, stringFilter } from './HelperFunctions'
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
      sortType: '',
      appliedFilter: ''
    }
  }

  componentDidMount = () => {
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
      .catch(console.error.bind(console))
  }

  sortColumn = (evt, index) => {
    const { fullData, filteredData, selectedColIndex, isFiltered } = this.state
    //handle edge case where no data meets criteria of filter 
    const data = isFiltered && filteredData.length ? filteredData : fullData
    const colValue = data[0][index]
    //determine data type of selected Column
    const selectedColType = isNaN(+colValue) ? 'string' : 'number'
    const [sortedData, sortType] = sortData(data, index, selectedColIndex, this.state.sortType)
    isFiltered ?
      this.setState({
        filteredData: sortedData,
        selectedColIndex: index,
        selectedColType,
        startIndex: 0,
        sortType
      })
      : this.setState({
        fullData: sortedData,
        selectedColIndex: index,
        selectedColType,
        startIndex: 0,
        sortType
      })
  }

  applyStrFilter = evt => {
    const filterStr = evt.target.value
    const { fullData, selectedColIndex } = this.state
    const filteredData = stringFilter(fullData, filterStr, selectedColIndex)
    //if filterStr is empty, set isFiltered to false
    const isFiltered = !!filterStr
    this.setState({
      filterStr,
      filteredData,
      isFiltered,
      startIndex: 0,
      appliedFilter: 'String Search'
    })
  }

  applyIntFilter = evt => {
    const { fullData, selectedColIndex, filteredData, isFiltered } = this.state
    //this allows multiple filters to be applied
    const curData = isFiltered && filteredData.length ? filteredData : fullData
    const newFilter = evt.target.value
    const newData = filterData(curData, selectedColIndex, evt.target.name)
    this.setState({
      filteredData: newData,
      isFiltered: true,
      startIndex: 0,
      appliedFilter: newFilter
    })
  }

  clearFilter = () => {
    this.setState({ isFiltered: false, startIndex: 0, appliedFilter: '' })
  }


  nextPage = (nextPageIndex) => {
    this.setState({ startIndex: nextPageIndex })
  }

  previousPage = (prevPageIndex) => {
    this.setState({ startIndex: prevPageIndex })
  }

  render = () => {
    const { csvTitles, fullData, filterStr, filteredData, startIndex, selectedColIndex, selectedColType, isFiltered, sortType, appliedFilter } = this.state
    const nextPageIndex = startIndex + 20
    const prevPageIndex = startIndex - 20
    const dataLength = isFiltered ? filterData.length : fullData.length
    return fullData.length ? (
      <div className="container">
        <h4>CSV Table</h4>
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
        <Table
          titles={csvTitles}
          isFiltered={isFiltered}
          filteredData={filteredData}
          fullData={fullData}
          sortColumn={this.sortColumn}
          startIndex={startIndex}
          dataType={selectedColType}
          sortType={sortType}
          selectedColIndex={selectedColIndex}
          appliedFilter={appliedFilter}
        />
        <div className="buttons">
      {/*only render buttons if there are previous and/or next pages*/}
          {prevPageIndex >= 0 ?
            <button onClick={() => this.previousPage(prevPageIndex)}>Previous</button>
            : null
          }
          {nextPageIndex < dataLength ?
            <button onClick={() => this.nextPage(nextPageIndex)}>Next</button>
            : null
          }
        </div>
        <Stats data={fullData} colIndex={selectedColIndex} />
      </div>
    )
      : <h3>...Loading</h3>
  }
}

export default App
