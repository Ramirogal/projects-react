import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import './Book.css'

export function Book ({ title, poster, index, author, available, onClick}) {
  const [isAdded, setIsAdded] = useState(available !== 'available')

  useEffect(() => {
    setIsAdded(available !== 'available')
  }, [available])

  const handleClick = () => {
    if (available === 'available') {
      onClick(index)
    }
  }

  return (
    <li className={`book-card`} key={index}>
      <div className='book-image-container'>
        <img className='book-image' src={poster} />
      </div>

      <div className='book-title'>
        <h3 className='title-text'>{title}</h3>
        <h3 className='author-text'>{author}</h3>
        <button className={`add-book-btn ${isAdded ? 'isSelected' : ''}`} onClick={() => {handleClick()}}>
          <span>{isAdded ? 'LEIDO' : 'LEER'}</span>
          {
            isAdded ? (
              <ion-icon name="checkmark-sharp"></ion-icon>
            ) : (
              <ion-icon name="bookmark"></ion-icon>
            )
          }
        </button>
      </div>
    </li>
  )
}

Book.propTypes = {
  title: PropTypes.string.isRequired,
  poster: PropTypes.string,
  author: PropTypes.string,
  index: PropTypes.number,
  available: PropTypes.string,
  onClick: PropTypes.func
}
