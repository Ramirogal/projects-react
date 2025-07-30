import PropTypes from 'prop-types'
import './BookFromList.css'

export function BookFromList ({ cover, index, title, author, deleteBook }) {
  return(
    <li className='list-item'>
      <div className='item-image'>
        <img src={cover} />
      </div>

      <div className='item-title'>
        <h3>{title}</h3>
        <p>{author}</p>
      </div>
      <div className='item-delete-container' >
        <button className='item-delete-btn' onClick={() => deleteBook(index)}>
          <ion-icon name="close"></ion-icon>
        </button>
      </div>
    </li>
  )
}

BookFromList.propTypes = {
  cover: PropTypes.string,
  index: PropTypes.number,
  title: PropTypes.string,
  author: PropTypes.string,
  deleteBook: PropTypes.func
}
