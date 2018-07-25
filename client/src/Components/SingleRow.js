import React from 'react'
import CellToolTip from './CellToolTip'

const SingleRow = props => {
  const { data, startIndex } = props
  return (
    data.map((row, rowIndex) => {
      return rowIndex >= startIndex && rowIndex < startIndex + 20 ?
        <tr key={rowIndex}>
          {row.map((dataValue, innerIndex) => (
            <td data-tip data-for={`dataToolTip${rowIndex}`} key={innerIndex}>
              {dataValue}
              <CellToolTip rowIndex={rowIndex} />
            </td>
          ))}
        </tr>
        : null
    }
    )

  )
}

export default SingleRow