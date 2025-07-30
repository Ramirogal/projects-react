import './ItemCart.css'
import PropTypes from "prop-types"

export function ItemCart ({ id, title, thumbnail, price, quantity, removeItem }) {
  return (
    <li className="cart-item">
      <div className="cart-item-image">
        <img src={thumbnail} alt={title} />
      </div>
      <div className="cart-item-info">
        <h3>{title}</h3>
        <p>Units: {quantity}</p>
        <button className="cart-item-btn" onClick={() => removeItem(id)}>
          Delete
          {/* <ion-icon name="trash-sharp"></ion-icon> */}
        </button>
      </div>
      <div className="cart-item-price">
        <p>$ {price}</p>
      </div>
    </li>
  )
}

ItemCart.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number,
  removeItem: PropTypes.func
}