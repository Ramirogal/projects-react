import { Book } from "./Book"
import { Header } from '../components/Header'

import { useReadingListStore } from "../store/readingList.ts"
import { useLibraryStore } from "../store/library.ts"
import { useFilters } from "../hooks/useFilters.jsx"
import { useNumberBookStore } from "../store/numberOfBooks.ts"
import { useUpdateAvailableBooks } from "../hooks/useUpdateAvailableBooks.jsx"



export function Library () {
  const books = useLibraryStore((state) => state.books)
  const deleteFromLibrary = useLibraryStore((state) => state.deleteBookFromLibrary)

  const setBookOnList = useReadingListStore((state) => state.setBookOnList)

  const incrementListCount = useNumberBookStore((state) => state.incrementListCount)
  const decrementLibraryCount = useNumberBookStore((state) => state.decrementLibraryCount)

  const { filteredBooks } = useFilters(books)

  useUpdateAvailableBooks(filteredBooks, books)

  const addBookToList = (index) => {
    deleteFromLibrary(index)
    setBookOnList(books[index].book, index)
    decrementLibraryCount()
    incrementListCount()
  }

  return (
    <div className="library-container">
      <Header />
      <main>
        <ul className="library">
          {
            filteredBooks.map((book, index) => (
              <Book
                key={index}
                title={book.book.title}
                poster={book.book.cover}
                index={book.index}
                available={filteredBooks[index].status}
                onClick={addBookToList}
              />
            ))
          }
        </ul>
      </main>
    </div>
  )
}
