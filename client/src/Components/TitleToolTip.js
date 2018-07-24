import React from 'react'
import ReactTooltip from 'react-tooltip'

const TitleToolTip = props => {
  const { colIndex, data } = props
  const dataType = isNaN(+data[0][colIndex]) ? 'text' : 'integer'
  return (
    <ReactTooltip id={`toolTipID${colIndex}`} type="dark" effect="solid">
      {dataType}
    </ReactTooltip>
  )
}

export default TitleToolTip