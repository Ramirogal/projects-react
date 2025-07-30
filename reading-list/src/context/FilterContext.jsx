import { createContext, useState } from "react";
import PropTypes from 'prop-types'

export const FilterContext = createContext()

export function FiltersProvider ({ children }) {
  const [filters, setFilters] = useState({
    genre: 'all',
    pages: 0
  })

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  )
}

FiltersProvider.propTypes = {
  children: PropTypes.node
}
