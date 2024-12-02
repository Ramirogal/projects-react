import { useEffect, useState } from "react";

export function useFetchById (id) {
  const [product, setProduct] = useState(null)
  
  if (!id) {
    setProduct(null)
  }

  useEffect(() => {
    const fetchById = async () => {
      const response = await fetch(`http://localhost:1234/items/${id}`)
      const data = await response.json()
      setProduct(data)
    }
    fetchById()
  }, [id])

  return { product }
}

export function useFetchProducts (query) {
  const [ products, setProducts ] = useState([])
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState(null)
  console.log(query)
  useEffect(() => {
    if (!query) {
      setProducts([])
    }

    const fetchProduct = async() => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`http://localhost:1234/items?q=${query}`)
        if (!response.ok) throw new Error(`Error: ${response.status}`)
        const data = await response.json()
        setProducts(data)
      }
      catch (e) {
        setProducts([])
        setError(e.message)
      }
      finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [query])

  return { products, loading, error }
}