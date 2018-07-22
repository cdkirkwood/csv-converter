import React from 'react'
import SingleRow from './SingleRow'

const Table = props => {
  const { titles, filterStr, filteredData, fullData, sortColumn } = props
  return (
    <table>
      <tbody>
        <tr>
          <th>Row</th>
          {titles.map((column, colindex) => (
            <th key={colindex}><button onClick={(evt => sortColumn(evt, colindex))}>{column}</button></th>
          ))}
        </tr>
        {filterStr ?
          filteredData.map((row, rowIndex) => (
            <SingleRow row={row} key={rowIndex} rowIndex={rowIndex} />
          )
          )
          : fullData.map((row, rowIndex) => (
            <SingleRow row={row} key={rowIndex} rowIndex={rowIndex} />
          )
          )
        }
      </tbody>
    </table>
  )
}

export default Table