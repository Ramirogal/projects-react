import { Filters } from "./Filters"
import { useNumberBookStore } from "../store/numberOfBooks"

export function Header () {
  const booksLibraryCount = useNumberBookStore((state) => state.booksLibraryCount) 
  const booksListCount = useNumberBookStore((state) => state.booksListCount)

  return (
    <>
      <div className="info-books">
        <div>
          <h1>{booksLibraryCount} libros disponibles</h1>
          {
            booksListCount > 0 && <h3>{booksListCount} libros disponibles</h3>
          }
        </div>
      </div>
      <Filters />
    </>
  )
}

