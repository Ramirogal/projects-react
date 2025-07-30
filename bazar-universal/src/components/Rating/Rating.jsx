import PropTypes from "prop-types"
import './Rating.css'

export function Rating ({ value, size="medium" }) {
  const fullStars = Math.floor(value)
  const hasHalfStar = value % 1 > 0.1 && value % 1 < 0.8
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className="rating-container">
    <span className={`rating-number ${size}`}>{value}</span>
    <div className={`rating-product ${size}`}>
      {
        Array.from({ length: fullStars }).map((star, index) => (
          <ion-icon key={index} name="star" className='full-star'></ion-icon>
        ))
      }
      {
        hasHalfStar && (
          <ion-icon name="star-half-outline" className='half-star'></ion-icon>
        )
      }
      {
        (Array.from({ length: emptyStars }).map((star, index) => (
          <ion-icon key={index} name="star-outline" className='empty-star'></ion-icon>
        )))
      }
    </div>
  </div>
  )
}

Rating.propTypes = {
  value: PropTypes.number,
  size: PropTypes.oneOf(["small", "medium", "large"])
}