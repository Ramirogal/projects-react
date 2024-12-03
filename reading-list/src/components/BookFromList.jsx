import PropTypes from 'prop-types'

export function BookFromList ({ cover, index, deleteBook }) {
  return(
    <li className='list-item'>
      <img src={cover} />
      <div className='list-delete-btn' onClick={() => deleteBook(index)}>
        <ion-icon name="close"></ion-icon>
      </div>
    </li>
  )
}

BookFromList.propTypes = {
  cover: PropTypes.string,
  index: PropTypes.number,
  deleteBook: PropTypes.func.isRequired
}
