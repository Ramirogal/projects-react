import { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useSearchStore } from "../store/search";

export function useSearch () {
  const [param] = useSearchParams()
  const searchState = useSearchStore((state) => state.search)
  const searchParam = param.get('search') || searchState
  const [search, setSearch] = useState(searchParam)
  const [searchOnChange, setSearchOnChange] = useState(searchParam)
  const setSearchState = useSearchStore(state => state.setSearch)
  
  const navigate = useNavigate()
  
  useEffect (() => {
    setSearch(searchParam)
    setSearchState(searchParam)
  }, [searchParam])

  const handleChange = useCallback((event) => {
    setSearch(prev => (prev, event.target.value))
  }, [])

  const handleSubmit = useCallback((event) => {
    event.preventDefault()
    setSearchOnChange(search)
    if (search) navigate(`/items?search=${search}`)
  },[search])

  return { search, searchParam,  handleChange, handleSubmit, searchOnChange}
}