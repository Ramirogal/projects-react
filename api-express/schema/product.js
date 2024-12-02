const z = require('zod')

const productSchema = z.object({
  title: z.string(),
  description: z.string().min(10, { message: 'Must be 10 or more characters long' }),
  price: z.number().positive(),
  discountPercentage: z.number().nonnegative(),
  rating: z.number().nonnegative().default(5),
  stock: z.number().int().nonnegative(),
  brand: z.string().max(20),
  category: z.string(),
  thumbnail: z.string().url({
    message: 'Thumbnail must be a valid URL'
  }),
  images: z.array(z.string().url()).min(1, { message: 'Must be at least 1 URL' })
})

function validateProduct (object) {
  return productSchema.safeParse(object) // retorna un booleano si hay error o si hay datos.
}

module.exports = {
  validateProduct
}
