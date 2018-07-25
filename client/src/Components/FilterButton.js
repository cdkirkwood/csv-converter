import React from 'react'

const FilterButton = props => {
  const {name, value, applyIntFilter} = props
  return (
    <button
      name={name}
      value={value}
      onClick={applyIntFilter}>
      {value}
      </button>
  )
}

export default FilterButton