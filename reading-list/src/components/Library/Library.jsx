import { Book } from "../Book/Book.jsx"
import { useFilters } from "../../hooks/useFilters.jsx"
import { useUpdateAvailableBooks } from "../../hooks/useUpdateAvailableBooks.jsx"
import { useBookActions } from "../../hooks/useBookActions.jsx"
import './Library.css'
import { useCallback } from "react"

export function Library () {
  const { books, addBookToList } = useBookActions()
  const { filteredBooks } = useFilters(books)
  
  useUpdateAvailableBooks(filteredBooks, books)

  const handleAddBook = useCallback((index) => {
    addBookToList(books[index].book, index)
  }, [books, addBookToList])

  return (
    <div className="library-container">
      <main>
        <ul className="library">
          {
            filteredBooks.map((book, index) => (
              <Book
                key={index}
                title={book.book.title}
                poster={book.book.cover}
                author={book.book.author.name}
                index={book.index}
                available={filteredBooks[index].status}
                onClick={handleAddBook}
              />
            ))
          }
        </ul>
      </main>
    </div>
  )
}
