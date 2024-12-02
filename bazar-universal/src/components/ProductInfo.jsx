import { Rating } from "./Rating"
import { Price } from './Price'
import PropTypes from "prop-types"

export function ProductInfo ({ title, brand, rating, price, discount, stock, description }) {
  const ratingRounded = parseFloat(rating.toFixed(1))
  
  

  
  const stockLarger5 = stock > 5

  return (
    <div className="detail-info-container">
      <div className="detail-info">
        <div className="product-name">{brand} | {title}</div>
        <Rating value={ratingRounded} />
        <Price price={price} discount={discount} size="large"/>

        <div className="product-stock">
          <div className="select-container">
            <label className="quantity-label">Cantidad:</label>
            <select className="select-box">
              {
                !stockLarger5 && (
                  <>
                    <option value='1'>1 unidad</option>
                    {
                      Array.from({ length: stock}, (_, index) => (
                        <option key={index} value={index + 2}>
                          {index + 2} unidades
                        </option>
                      ))
                    }
                  </>
                )
              }
              {
                stockLarger5 && (
                  <>
                    <option value='1'>1 unidad</option>
                    {
                      Array.from({ length: 4 }, (_, index) => (
                        <option key={index} value={index + 2}>
                          {index + 2} unidades
                        </option>
                      ))
                    }
                    <option value="+5">Más de 5 unidades</option>
                  </>
                )
              }
            </select>
            <ion-icon name="chevron-down-outline" class='selection-icon'></ion-icon>
          </div>
          {
            stock > 10 ? (
              <span className="stock-available">(+10 disponibles)</span>
            ) : (
              <span className="stock-available">({stock} disponibles)</span>
            )
          }
          
        </div>

        <div className="btn-container">
          <button className="buy-btn">
            Comprar ahora
          </button>
          <button className="add-cart-btn">
            Agregar al Carrito
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
  description: PropTypes.string.isRequired
}