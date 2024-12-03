import { useReadingListStore } from '../store/readingList'
import { useLibraryStore } from '../store/library'
import { BookFromList } from './BookFromList'
import { useNumberBookStore } from "../store/numberOfBooks.ts"

export function ReadingList () {
  const booksOnList = useReadingListStore((state) => state.booksOnList)
  const deleteFromList = useReadingListStore((state) => state.deleteBookFromList)
  const resetList = useReadingListStore((state) => state.deleteList)

  const setBookOnLibrary = useLibraryStore((state) => state.setBookOnLibrary)
  const resetLibrary = useLibraryStore((state) => state.resetLibrary)

  const setListCount = useNumberBookStore((state) => state.setBooksListCount)
  const incrementLibraryCount = useNumberBookStore((state) => state.incrementLibraryCount)
  const decrementListCount = useNumberBookStore((state) => state.decrementListCount)

  const hasBooks = booksOnList?.length > 0

  const deleteBook = (index) => {
    deleteFromList(booksOnList[index].book)
    setBookOnLibrary(booksOnList[index].index)
    incrementLibraryCount()
    decrementListCount()
  }

  const handleReset = () => {
    resetLibrary()
    resetList()
    setListCount(0)
  } 

  return (
    <aside>
      <div className="reading-list">
        <div className='title-reading'>
          <h3 className='list-title'>Lista de Libros</h3>
          <button className='reset-list-btn' onClick={handleReset}>
            <ion-icon name="trash-outline" className='icon'></ion-icon>  
          </button>
        </div>
        <ul>
        {
          hasBooks &&
          booksOnList.map((book, index) => (
            <BookFromList key={index} cover={book.book.cover} index={index} deleteBook={deleteBook}/>
          ))
        }
        </ul>
      </div>
    </aside>
  )
}
