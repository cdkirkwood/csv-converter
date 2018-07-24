import React from 'react'

const Filters = props => {
  const { data, colIndex, applyIntFilter, applyStrFilter, filterStr, selectedColType, clearFilter, titles } = props
  return selectedColType === 'string' ?
    <div>
      <input type="text" name={filterStr} value={filterStr} onChange={applyStrFilter} placeholder={`Search ${titles[colIndex]}`}/>
    </div>
    : <div>
      <button name="top25" onClick={applyIntFilter}>Top 25%</button>
      <button name="bottom25" onClick={applyIntFilter}>Bottom 25%</button>
      <button name="over100" onClick={applyIntFilter}>Values >= 100</button>
      <button name="under100" onClick={applyIntFilter}>{'Values < 100'}</button>
      <button name="clear" onClick={clearFilter}>Clear Filter</button>
    </div>
}

export default Filters