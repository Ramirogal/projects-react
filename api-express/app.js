const products = require('./products.json')
const express = require('express')
const app = express()
const { validateQuery } = require('./schema/query')
app.disable('x-powered-by') // desabilita el header X-Powered-By: Express

app.use(express.json())

const ACCEPTED_ORIGINS = [
  'http://localhost:5173'
]

app.get('/items', (req, res) => {
  const origin = req.header('origin')
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) { // Si origin es 'http://localhost:1234, no tiene header.
    res.header('Access-Control-Allow-Origin', origin)
  }

  const { q } = req.query
  const result = validateQuery(q)

  if (result.error) return res.status(400).json({ message: 'Invalid query parameter' })

  const queryData = result.data
  const productSearch = products.products.filter((prod) => {
    return (
      prod.category.includes(queryData) ||
      prod.title.toLowerCase().includes(queryData) ||
      prod.brand.toLowerCase().includes(queryData)
    )
  })

  if (productSearch.length === 0) return res.status(404).json({ message: 'No products found matching your query' })

  res.json(productSearch)
})

app.get('/items/:id', (req, res) => {
  const origin = req.header('origin')
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
  }

  const { id } = req.params // Para rutas dinamicas
  // Validar ID.
  const product = products.products.find((prod) => prod.id === Number(id))
  if (!product) return res.status(404).json({ message: 'Product not found' })

  return res.json(product)
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server listening on port https://localhost:${PORT}`)
})

/* const { validateProduct } = require('./schema/product')

app.post('/items', (req, res) => {
  const result = validateProduct(req.body)
  if (result.error) {
    return res.status(422).json({ error: JSON.parse(result.error.message) })
  }

  const newProduct = {
    id: products.products.length + 1,
    ...result.data
  }
}) */
