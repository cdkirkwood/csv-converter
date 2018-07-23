import React from 'react'
import SingleRow from './SingleRow'
import ReactTooltip from 'react-tooltip'

const Table = props => {
  const { titles, filterStr, filteredData, fullData, sortColumn, startIndex } = props
  return (
    <div>
      <table>
        <tbody>
          <tr>
            {titles.map((column, colindex) => (
              <th data-tip data-for="titleToolTip" key={colindex}><button onClick={(evt => sortColumn(evt, colindex))}>{column}</button></th>
            ))}
          </tr>
          {filterStr ?
            <SingleRow data={filteredData} startIndex={startIndex} />
            : <SingleRow data={fullData} startIndex={startIndex} />
          }
        </tbody>
      </table>
      <ReactTooltip id="titleToolTip" type="dark" effect="solid">
        Test
      </ReactTooltip>
    </div>
  )
}

export default Table