import { useLocation, useParams } from "react-router-dom"
import { Gallery } from "../Gallery/Gallery"
import { ProductInfo } from "../ProductInfo/ProductInfo"
import { NavBar } from "../NavBar/NavBar"
import { useSearch } from '../../hooks/useSearch'
import { useFetchById } from "../../hooks/useFetchProducts"
import { useCartStore } from "../../store/cart"
import './Detail.css'
import { useState } from "react"
import { Zoom } from "../Zoom/Zoom"
import { GallerySlider } from "../GallerySlider/GallerySlider"
import { useIsMobile } from "../../hooks/useIsMobile"

export function Detail () {
  const { id } = useParams()
  const { state } = useLocation()
  const productById = useFetchById(id)
  const product = state?.product || productById.product

  const isMobile = useIsMobile()
  const images = isMobile ? [product.thumbnail, ...product.images] : []

  const [ picture, setPicture ] = useState(product.thumbnail)
  const [backgroundPosition, setBackgroundPosition] = useState("50% 50%")
  const [mouseMoving, setMouseMoving] = useState(false)

  const cart = useCartStore(state => state.productArray)
  const quantity = cart.length
  const removeProduct = useCartStore(state => state.removeProduct)
  const addProduct = useCartStore(state => state.addProduct)

  const { search, handleChange, handleSubmit } = useSearch()

  const addToCart = (quantity) => {
    addProduct(product, quantity)
  }

  if (!product) {
    return <div>Loading...</div>
  }

  return (
    <main className="detail-container">
      <NavBar 
        search={search} 
        handleChange={handleChange} 
        handleSubmit={handleSubmit}
        cart={cart}
        quantity={quantity}
        removeItem={removeProduct}
      />
      <div className="product-detail">
        <Gallery 
          thumbnail={product.thumbnail}
          images={product.images}
          title={product.title}
          picture={picture}
          setPicture={setPicture}
          setBackgroundPosition={setBackgroundPosition}
          mouseMoving={mouseMoving}
          setMouseMoving={setMouseMoving}
        />
        <ProductInfo
          title={product.title}
          brand={product.brand}
          rating={product.rating}
          price={product.price}
          discount={product.discountPercentage}
          stock={product.stock}
          description={product.description}
          addToCart={addToCart}
        >
          {
            (mouseMoving && !isMobile ) && (
              <Zoom imageURL={picture} backgroundPosition={backgroundPosition} showZoom={mouseMoving} />
            )
          }
          {
            isMobile && <GallerySlider images={images} />
          }
        </ProductInfo>
      </div>
    </main>
  )
}
