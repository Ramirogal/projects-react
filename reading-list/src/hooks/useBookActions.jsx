import { useLibraryStore } from "../store/library"
import { useNumberBookStore } from "../store/numberOfBooks"
import { useReadingListStore } from "../store/readingList"

function useLibraryData () {
  const books = useLibraryStore((state) => state.books)
  const removeLibrary = useLibraryStore((state) => state.removeBook)
  const addLibrary = useLibraryStore((state) => state.addBook)
  const resetLibrary = useLibraryStore((state) => state.resetLibrary)
  const incrementLibraryCount = useNumberBookStore((state) => state.incrementLibraryCount)
  const decrementLibraryCount = useNumberBookStore((state) => state.decrementLibraryCount)

  return { books, addLibrary, removeLibrary, resetLibrary, incrementLibraryCount, decrementLibraryCount }
}

function useReadingListData () {
  const listOfBooks = useReadingListStore((state) => state.listOfBooks)
  const addList = useReadingListStore((state) => state.addBook)
  const removeList = useReadingListStore((state) => state.removeBook)
  const resetList = useReadingListStore((state) => state.resetList)
  const setListCount = useNumberBookStore((state) => state.setBooksListCount)
  const incrementListCount = useNumberBookStore((state) => state.incrementListCount)
  const decrementListCount = useNumberBookStore((state) => state.decrementListCount)

  return { listOfBooks, addList, removeList, resetList, setListCount, incrementListCount, decrementListCount }
}

export function useBookActions () {
  const { listOfBooks, addList, removeList, resetList, setListCount, incrementListCount, decrementListCount } = useReadingListData()

  const { books, addLibrary, removeLibrary, resetLibrary, incrementLibraryCount, decrementLibraryCount } = useLibraryData()
  
  const addBookToList = (book, index) => {
    removeLibrary(index)
    addList(book, index)
    incrementListCount()
    decrementLibraryCount()
  }
  
  const removeBookFromList = (book, index) => {
    removeList(book)
    addLibrary(index)
    incrementLibraryCount()
    decrementListCount()
  }
  
  const resetAll = () => {
    if (listOfBooks.length === 0) return
    resetLibrary()
    resetList()
    setListCount(0)
  }

  return { books, listOfBooks, addBookToList, removeBookFromList, resetAll }
}
