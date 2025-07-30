import PropTypes from 'prop-types'
import { Rating } from '../Rating/Rating.jsx'
import { Price } from '../Price/Price.jsx'
import './Card.css'

export function Card ({ id, title, brand, description, imageURL, price, discount, rating, detailClick }) {
  const handleClick = () => {
    detailClick(id)
  }

  return (
    <li className='product-card' onClick={handleClick}>
      <div className='product-wrapper'>
        <div className='result-image'>
          <img className='product-card-image' src={imageURL} alt={title}></img>
        </div>
        <div className='info-card'>
          <div className='brand-title-container'>
            <span className='brand-span'>{brand}</span>
            <h3>{title}</h3>
          </div>
          <p className='card-description'>{description}</p>
          <div className='desktop-view'>
            <Rating value={rating} />
            <Price price={price} discount={discount} size='small' />
          </div>
          <div className='mobile-view'>
            <Rating value={rating} size='medium' />
            <Price price={price} discount={discount} size='small' />
          </div>
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

