import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchProducts } from "./useFetchProducts";


export function useSearchProducts (search) {
  const { products, loading, error } = useFetchProducts(search)
  const navigate = useNavigate()

  const hasProducts = useMemo(() => {
    return products?.length > 0
  }, [products])

  const handleClickProduct = useCallback((id) => {
    const product = products.find(prod => prod.id === id)
    navigate(`/items/${id}`, { state: { product: product } })
  }, [products, navigate])

  const brands = new Map()
  products.forEach((prod) => {
    brands.set(prod.brand, (brands.get(prod.brand) || 0) + 1)
  })

  const prices = new Map([
    ["Under $80", 0],
    ["$80 to $190", 0],
    ["Over $190", 0]
  ])

  products.forEach((prod) => {
    if (prod.price < 80) {
      prices.set("Under $80", prices.get("Under $80") + 1)
    } else if (prod.price >= 80 && prod.price < 190) {
      prices.set("$80 to $190", prices.get("$80 to $190") + 1)
    } else {
      prices.set("Over $190", prices.get("Over $190") + 1)
    }
  })

  const brandsArray = Array.from(brands.entries())
  const pricesArray = Array.from(prices.entries())
  return { products, hasProducts, error, loading, handleClickProduct, brandsArray, pricesArray }
}