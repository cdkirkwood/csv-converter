import React from 'react'
import ReactTooltip from 'react-tooltip'

const CellToolTip = (props) => {
  return (
    <ReactTooltip id={`dataToolTip${props.rowIndex}`} type="dark" effect="solid">
      {`Row: ${props.rowIndex + 1}`}
    </ReactTooltip>
  )
}

export default CellToolTip