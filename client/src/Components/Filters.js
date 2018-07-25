import React from 'react'
import './Filters.css'
import FilterButton from './FilterButton'

const Filters = props => {
  const { colIndex, applyIntFilter, applyStrFilter, filterStr, selectedColType, clearFilter, titles } = props
  return selectedColType === 'string' ?
    <div className="str-filter">
      <input type="text"
        name={filterStr}
        value={filterStr}
        onChange={applyStrFilter}
        placeholder={`Search ${titles[colIndex]}`} />
      <button
        name="clear"
        onClick={clearFilter}>
        Clear Filter
      </button>
    </div>
    : <div className="int-filters">
      <h4>Filters</h4>
      <FilterButton
        name="top25"
        value="Top 25%"
        applyIntFilter={applyIntFilter}
      />
      <FilterButton
        name="bottom25"
        value="Bottom 25%"
        applyIntFilter={applyIntFilter}
      />
      <FilterButton
        name="over100"
        value="Values >= 100"
        applyIntFilter={applyIntFilter}
      />
      <FilterButton
        name="under100"
        value="Values < 100"
        applyIntFilter={applyIntFilter}
      />
      <button name="clear"
        onClick={clearFilter}>
        Clear Filter
      </button>
    </div>
}

export default Filters