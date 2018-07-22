import React from 'react'

const SingleRow = props => {
  const {row, rowIndex} = props
  return (
    <tr>
      <td>{rowIndex + 1}</td>
      {row.map((dataValue, innerIndx) => (
        <td key={innerIndx}>{dataValue}</td>
      ))}
    </tr>
  )
}

export default SingleRow