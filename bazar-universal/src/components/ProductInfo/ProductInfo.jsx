import { Rating } from "../Rating/Rating"
import { Price } from '../Price/Price'
import { Stock } from '../Stock/Stock'
import PropTypes from "prop-types"
import './ProductInfo.css'
import { useState } from "react"

export function ProductInfo ({ title, brand, rating, price, discount, stock, description, addToCart, children }) {
  const [quantity, setQuantity] = useState(1)
  const [error, setError] = useState(null)
  const ratingRounded = parseFloat(rating.toFixed(1))

  return (
    <div className="detail-info-container">
      {children}
      <div className="detail-info">
        <div className="product-name">{brand} | {title}</div>
        <Rating value={ratingRounded} />
        <Price price={price} discount={discount} size="large"/>
        <Stock stock={stock} quantity={quantity} setQuantity={setQuantity} error={error} setError={setError} />

        <div className="btn-container">
          <button className="buy-btn">
            Buy now
          </button>
          <button className="add-cart-btn" onClick={() => {
            if (!error) addToCart(quantity)
          }}
          >
            Add to cart
          </button>
        </div>
        
        <div className="product-description">
          <label className="description-label">Description</label>
          <span className="description-info">{description}.</span>
        </div>
      </div>
    </div>
  )
}

ProductInfo.propTypes = {
  title: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  discount: PropTypes.number.isRequired,
  stock: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  addToCart: PropTypes.func.isRequired,
  children: PropTypes.node
}
