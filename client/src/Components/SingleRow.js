import React from 'react'
import ReactTooltip from 'react-tooltip'

const renderToolTip = (rowIndex, colIndex) => {
  return (
    <ReactTooltip id={`dataToolTip${rowIndex}`} type="dark" effect="solid">
      {`Row: ${rowIndex + 1}`}
    </ReactTooltip>
  )
}

const SingleRow = props => {
  const { data, startIndex } = props
  return (
    data.map((row, rowIndex) => {
      return rowIndex >= startIndex && rowIndex < startIndex + 20 ?
        <tr key={rowIndex}>
          {row.map((dataValue, innerIndex) => (
            <td data-tip data-for={`dataToolTip${rowIndex}`} key={innerIndex}>
              {dataValue}
              {renderToolTip(rowIndex, dataValue)}
            </td>
          ))}
        </tr>
        : null
    }
    )

  )
}

export default SingleRow