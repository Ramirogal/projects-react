import { products } from '../mocks/products.json'

export function adapterSearch (search) {
  if (!search) return 

  const filteredSearch = search.toLowerCase()
  filteredSearch.trim()

  const productsList = products.filter((prod) => {
    return prod.category.includes(filteredSearch) || prod.title.toLowerCase().includes(filteredSearch) || prod.brand.toLowerCase().includes(filteredSearch)
  })
  return productsList
}