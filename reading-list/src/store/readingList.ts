import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Book {
  title: string,
  pages: number,
  genre: string,
  cover: string,
  synopsis: string,
  year: number,
  ISBN: string,
  author: {
    name: string,
    otherBooks: string[]
  }
}

interface LibraryItem {
  book: Book,
  index: number
}

interface ReadingList {
  booksOnList: LibraryItem []
  setBookOnList: (book: Book, index: number) => void,
  deleteBookFromList: (book: Book) => void,
  deleteList: () => void
}


export const useReadingListStore = create<ReadingList>()(
  persist(
    (set) => ({
      booksOnList: [],
      setBookOnList: (book, index) => {
        set((state) => {
          const newItem: LibraryItem = { book, index };
          const newList = [...state.booksOnList, newItem];
          
          return {
            booksOnList: newList,
          }
        })
      },
      deleteBookFromList: (book) => {
        set((state) => {
          const newList = state.booksOnList.filter((bookOnList) => {
            return bookOnList.book.ISBN !== book.ISBN;
          })
          
          return { 
            booksOnList: newList 
          }
        })
      },
      deleteList: () => {
        set((state) => {
          return {
            booksOnList: []
          }
        })
      }
    }),
    {
      name: "reading-list-storage", // El nombre de la clave en localStorage
      partialize: (state) => ({ booksOnList: state.booksOnList }) // Especifica la parte del estado a persistir
    }
  )
)

/* export const useReadingListStore = create<ReadingList>((set) => ({
  booksOnList: [],
  setBookOnList: (book, index) => {
    set((state) => {
      const newItem: LibraryItem = { book, index }
      const newList = [...state.booksOnList, newItem]

      return {
        booksOnList: newList,
      }
    })
  },
  deleteBookFromList: (book) => {
    set((state) => {
      const newList = state.booksOnList.filter(bookOnList => {
        return bookOnList.book.ISBN !== book.ISBN
      })
      return { 
        booksOnList: newList 
      }
    })
  },
  deleteList: () => {
    set((state) => {
      return {
        booksOnList: []
      }
    })
  }
}))
*/
