import { useContext, useMemo } from "react";
import { FilterContext } from "../context/FilterContext";

export function useFilters (books) {
  const { filters } = useContext(FilterContext)

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      if ((filters.genre === 'all' || book.book.genre === filters.genre) && book.book.pages >= filters.pages ) {
        return book
      }
    })
  }, [filters, books])
  

  return { filteredBooks }
}