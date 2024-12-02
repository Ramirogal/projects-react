const z = require('zod')

/* const querySchema = z.object({
  q: z.string().trim().toLowerCase()
}) */

const querySchema = z.string().trim().toLowerCase()

function validateQuery (object) {
  return querySchema.safeParse(object)
}

module.exports = {
  validateQuery
}
