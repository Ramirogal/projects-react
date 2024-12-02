import { useLocation } from "react-router-dom"
import { Gallery } from "./Gallery"
import { ProductInfo } from "./ProductInfo"
/* import { useFetchById } from "../hooks/useFetchProducts" */

export function Detail () {
/*   const { id } = useParams() */
  const { state } = useLocation()
  const product = (state.product) // Buscar forma de pasar product desde la API.
  return (
    <main className="detail-container">
      <div className="product-detail">
        <Gallery 
          thumbnail={product.thumbnail}
          images={product.images}
          title={product.title}
        />
        <ProductInfo 
          title={product.title}
          brand={product.brand}
          rating={product.rating}
          price={product.price}
          discount={product.discountPercentage}
          stock={product.stock}
          description={product.description}
        />
      </div>
    </main>
  )
}
