import { useState, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useFetchProducts } from "./useFetchProducts";


export function useSearch () {
  const [param] = useSearchParams()
  const searchParam = param.get('search')
  const [search, setSearch] = useState(searchParam)
  const [searchState, setSearchState] = useState(searchParam)
  const navigate = useNavigate()
  
  useEffect (() => {
    setSearch(searchParam)
    setSearchState(searchParam)
  }, [searchParam])
  
  const { products, loading, error } = useFetchProducts(searchState)
  const hasProducts = useMemo(() => {
    return products?.length > 0
  }, [products])
  

  const handleChange = (event) => {
    setSearch(prev => (prev, event.target.value))
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    setSearchState(search)
    if (search) navigate(`/items?search=${search}`)
  }
  const handleClick = (id) => {
    const product = products.find(prod => prod.id === id)
    navigate(`/items/${id}`, { state: { product: product } })
  }

  return { search, searchParam, hasProducts, products, error, loading, handleChange, handleSubmit, handleClick}
}