import React from 'react'
import ReactTooltip from 'react-tooltip'

const TitleToolTip = props => {
  const { colIndex, data, sortType, selectedColIndex, appliedFilter } = props
  const dataType = isNaN(+data[0][colIndex]) ? 'Text' : 'Integer'
  const filter = appliedFilter ? appliedFilter : 'None'
  return (
    <ReactTooltip id={`toolTipID${colIndex}`} type="dark" effect="solid">
      <div>
        {`Data Type: ${dataType}`}
        <br />
      </div>
      {/*if the hovered column is the sorted and/or filtered column, show sort/filter type*/}
      {selectedColIndex === colIndex ?
        <div>
          {`Sorting Order: ${sortType}`}
          <br />
          {`Filter Applied: ${filter}`}
        </div>
        : <div>
        Sorting Order: None
        <br />
        Filter Applied: None
        </div>
      }
    </ReactTooltip>
  )
}

export default TitleToolTip