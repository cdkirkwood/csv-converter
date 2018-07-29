import React from 'react'
import './Filters.css'
import FilterButton from './FilterButton'

const Filters = props => {
  const { colIndex, applyIntFilter, applyStrFilter, filterStr, selectedColType, clearFilter, titles } = props
  const intFilters = [
    {name: 'top25', value:'Top 25%'}, 
    {name:'bottom25', value: 'Bottom 25%'},
    {name:'over100', value:'Values >= 100'},
    {name: 'under100', value: 'Values < 100'}
  ]
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
      {intFilters.map(filter => (
        <FilterButton
        name={filter.name}
        value={filter.value}
        applyIntFilter={applyIntFilter}
      />
      ))}
      <button name="clear"
        onClick={clearFilter}>
        Clear Filter
      </button>
    </div>
}

export default Filters