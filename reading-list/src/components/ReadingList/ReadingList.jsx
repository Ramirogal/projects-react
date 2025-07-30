import { useBookActions } from '../../hooks/useBookActions.jsx'
import { BookFromList } from '../BookFromList/BookFromList.jsx'
import './ReadingList.css'

export function ReadingList () {
  const { listOfBooks } = useBookActions(state => state.listOfBooks || [])
  const { removeBookFromList, resetAll } = useBookActions()
  const hasBooks = listOfBooks?.length > 0

  const handleRemoveBook = (index) => {
    const book = listOfBooks[index]
    removeBookFromList(book.book, book.index)
  }

  return (
      <section className="reading-list-section">
        <div className='title-list-container'>
          <h3 className='title-list'>Lista de Libros</h3>
          <button className='reset-list-btn' onClick={resetAll}>
            <ion-icon name="trash-bin"></ion-icon>
          </button>
        </div>
        <ul className='reading-list'>
        {
          hasBooks &&
          listOfBooks.map((book, index) => (
            <BookFromList 
              key={index}
              cover={book.book.cover}
              index={index}
              title={book.book.title}
              author={book.book.author.name}
              deleteBook={handleRemoveBook}
            />
          ))
        }
        </ul>
      </section>
  )
}
