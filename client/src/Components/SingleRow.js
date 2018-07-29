import React from 'react'
import CellToolTip from './CellToolTip'

const SingleRow = props => {
  const { data, startIndex } = props
  const section = data.slice(startIndex, startIndex + 20)
  return (
    section.map((row, rowIndex) => (
      <tr key={rowIndex}>
        {row.map((dataValue, innerIndex) => (
          <td data-tip data-for={`dataToolTip${rowIndex}`} key={innerIndex}>
            {dataValue}
            <CellToolTip rowIndex={rowIndex} />
          </td>
        ))}
      </tr>
    )
    )

  )
}

export default SingleRow