import { useEffect, useState } from 'react'
import { USE_LOCAL_DATA } from '../config'
import Products from '../data/products.json'

export function useFetchById (id) {
  const [product, setProduct] = useState(null)
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState(null)

  useEffect(() => {
    if (!id) {
      setProduct(null)
      return
    }
    const fetchById = async () => {
      let data
      try {
          if (USE_LOCAL_DATA) {
            const productList = Products.products
            data = productList.filter(p => Number(p.id) === id)
            if (data.length === 0) {
              throw new Error ('Product not found')
            }
          } else {
            const response = await fetch(`http://localhost:1234/items/${id}`)
            data = await response.json()
          }
        } catch (e) {
          setProduct([])
          setError(e.message)
        } finally {
          setLoading(false)
        }
      setProduct(data)
    }
    fetchById()
  }, [id])

  return { product, loading, error }
}

export function useFetchProducts (query) {
  const [ products, setProducts ] = useState([])
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState(null)
  useEffect(() => {
    if (!query) {
      setProducts([])
    }

    const fetchProduct = async() => {
      setLoading(true)
      setError(null)
      try {
        let data
        if (USE_LOCAL_DATA) {
          const listProducts = Products.products
          data = listProducts.filter(p => (
            p.title.toLowerCase().includes(query.toLowerCase()) || 
            p.category.toLowerCase().includes(query.toLowerCase())
          ))
        } else {
          const response = await fetch(`http://localhost:1234/items?q=${query}`)
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`)
          }  
          data = await response.json()
        }

        setProducts(data)
      } catch (e) {
        setProducts([])
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [query])

  return { products, loading, error }
}
