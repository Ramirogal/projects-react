import { create } from "zustand"
import { persist } from "zustand/middleware"
import { library } from '../mocks/books.json'

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
  status: "available" | "not-available",
  index: number
}

interface Library {
  books: LibraryItem[],
  setBookOnLibrary: (indexBook: number) => void,
  deleteBookFromLibrary: (indexBook: number) => void,
  resetLibrary: () => void
}

export const useLibraryStore = create<Library>()(
  persist(
    (set) => ({
      books: library.map((item: { book: Book }, index) => ({
        book: item.book,
        status: "available",
        index: index
      })),
      setBookOnLibrary: (indexBook) => {
        set((state) => {
          return {
            books: state.books.map((item, index) => {
              return index === indexBook ? { ...item, status: "available" } : item;
            })
          };
        });
      },
      deleteBookFromLibrary: (indexBook) => {
        set((state) => {
          return {
            books: state.books.map((book, index) => {
              return index === indexBook ? { ...book, status: "not-available" } : book;
            })
          };
        });
      },
      resetLibrary: () => {
        set((state) => {
          return {
            books: state.books.map((book) => ({
              ...book,
              status: 'available'
            }))
          }
        })
      }
    }),
    {
      name: "library-storage", // Nombre para el almacenamiento en localStorage
      partialize: (state) => ({ books: state.books }) // Especifica qué parte del estado guardar
    }
  )
); 

/* export const useLibraryStore = create<Library>((set) => ({
  books: library.map((item: { book: Book }, index) => ({
    book: item.book,
    status: "available",
    index: index
  })),
  setBookOnLibrary: (indexBook) => {
    set((state) => {
      const newItem = state.books[indexBook]
      return {
        books: state.books.map((item, index) => {
          return index === indexBook ? { ...item, status: "available" } : item
        })
      }
    })
  },
  deleteBookFromLibrary: (indexBook) => {
    set((state) => {
      return {
        books: state.books.map((book, index) => {
          return index === indexBook ? { ...book, status: "not-available" } : book
        })
      }
    })
  },
  resetLibrary: () => {
    set((state) => {
      return {
        books: state.books.map((book) => ({
          ...book,
          status: 'available'
        }))
      }
    })
  }
})) */