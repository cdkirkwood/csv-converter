import React from 'react'
import ReactTooltip from 'react-tooltip'

// const renderToolTip = index => (
//   <ReactTooltip id="dataToolTip" type="dark" effect="solid">
//   {index}
// </ReactTooltip>
// )
const SingleRow = props => {
  const { data, startIndex } = props
  return (
    data.map((row, rowIndex) => {
      return rowIndex >= startIndex && rowIndex < startIndex + 20 ?
        <tr key={rowIndex}>
          {row.map((dataValue, innerIndx) => (
            <td data-tip data-for="dataToolTip" key={innerIndx}>
              {dataValue}
            </td>
          ))}
        </tr>
        : null
    }
    )

  )
}

export default SingleRow