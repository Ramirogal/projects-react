import PropTypes from "prop-types"

export function Price ({ price, discount, size = 'normal' }) {
  const hasDiscount = discount !== 0.0
  const discountRounded = discount.toFixed(0)
  let priceWithDiscount = (price * (1 - discount / 100))
  priceWithDiscount = parseFloat(priceWithDiscount.toFixed(2))

  return (
    <div className="product-price">
      {
        hasDiscount && (
          <span className={`without-discount ${size}`}><strike>$ {price}</strike> </span>
        )
      }
      <div className="price-wrapper">
        <span className={`money-amount ${size}`}>$ {hasDiscount ? priceWithDiscount : price}</span>
        {
          hasDiscount && (
            <span className={`discount ${size}`}>{discountRounded}% OFF</span>
          )
        }
      </div>
    </div>
  )
}

Price.propTypes = {
  price: PropTypes.number,
  discount: PropTypes.number,
  size: PropTypes.oneOf(["small", "medium", "large"])
}