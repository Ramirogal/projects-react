import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

export function Book ({ title, poster, index, available, onClick}) {
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
    <li className={`book-card ${available}`} key={index}>
      <img src={poster} />
      {
        !isAdded && (
          <div className='book-title'>
            <p>{title}</p>
            <button className='add-book-btn' onClick={() => {handleClick()}}>
              <ion-icon name="bookmark"></ion-icon>
              <span>Agregar</span>
            </button>
          </div>
      )}
    </li>
  )
}

Book.propTypes = {
  title: PropTypes.string,
  poster: PropTypes.string,
  index: PropTypes.number,
  available: PropTypes.string,
  onClick: PropTypes.func
}
