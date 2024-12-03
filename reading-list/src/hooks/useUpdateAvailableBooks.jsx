import { useEffect, useMemo } from 'react'
import { useNumberBookStore } from '../store/numberOfBooks';


export function useUpdateAvailableBooks(filteredBooks, books) {
  const setBookLibraryCount = useNumberBookStore((state) => state.setBooksLibraryCount);

  const availableFilteredBooks = useMemo(() => {
    return filteredBooks.filter(book =>
      books.some(item => item.book.ISBN === book.book.ISBN && item.status === "available")
    );
  }, [filteredBooks, books]);

  useEffect(() => {
    setBookLibraryCount(availableFilteredBooks.length);
  }, [availableFilteredBooks, setBookLibraryCount]);
  return
}