import PropTypes from 'prop-types'
import { Rating } from './Rating.jsx'
import { Price } from './Price.jsx'

export function Card ({ id, title, brand, description, imageURL, price, discount, rating, detailClick }) {
  const handleClick = () => {
    detailClick(id)
  }

  return (
    <li className='product-card' onClick={handleClick} >
      <div className='product-wrapper'>
        <div className='result-image'>
          <img src={imageURL} alt={title}></img>
        </div>

        <div className='info-card'>
          <span className='brand-span'>{brand}</span>
          <h3>{title}</h3>
          <p className='card-description'>{description}</p>
          <Rating value={rating}/>
          <Price price={price} discount={discount} />
        </div>

      </div>
    </li>
  )
}

Card.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  brand: PropTypes.string,
  description: PropTypes.string,
  imageURL: PropTypes.string,
  price: PropTypes.number,
  discount: PropTypes.number,
  rating: PropTypes.number,
  detailClick: PropTypes.func
}