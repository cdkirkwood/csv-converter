import React, { Component } from 'react'
import SingleRow from './SingleRow'
import TitleToolTip from './TitleToolTip'

const Table = props => {
  const { titles, isFiltered, filteredData, fullData, sortColumn, startIndex } = props
  return (
    <div>
      <table>
        <tbody>
          <tr>
            {titles.map((column, colIndex) => (
              <th data-tip data-for={`toolTipID${colIndex}`} key={colIndex}>
                <button onClick={(evt => sortColumn(evt, colIndex))}>
                  {column}
                </button>
                <TitleToolTip colIndex={colIndex} data={fullData} />
              </th>
            ))}
          </tr>
          {isFiltered ?
            <SingleRow data={filteredData} startIndex={startIndex} />
            : <SingleRow data={fullData} startIndex={startIndex} />
          }
        </tbody>
      </table>
    </div>
  )
}

export default Table