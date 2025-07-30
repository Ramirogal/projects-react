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

interface ListItem {
  book: Book,
  index: number
}

interface ReadingList {
  listOfBooks: ListItem []
  addBook: (book: Book, index: number) => void,
  removeBook: (book: Book) => void,
  resetList: () => void
}

export const useReadingListStore = create<ReadingList>()(
  persist(
    (set) => ({
      listOfBooks: [],
      addBook: (book, index) => {
        set((state) => {
          const newItem: ListItem = { book, index };
          const newList = [...state.listOfBooks, newItem];

          return {
            listOfBooks: newList,
          }
        })
      },
      removeBook: (book) => {
        set((state) => {
          const newList = state.listOfBooks.filter((item) => {
            return item.book.ISBN !== book.ISBN;
          })

          return { 
            listOfBooks: newList 
          }
        })
      },
      resetList: () => {
        set((state) => {
          return {
            listOfBooks: []
          }
        })
      }
    }),
    {
      name: "reading-list-storage",
      partialize: (state) => ({ listOfBooks: state.listOfBooks})
    }
  )
)

/* export const useReadingListStore = create<ReadingList>((set) => ({
  listOfBooks: [],
  addBook: (book, index) => {
    set((state) => {
      const newItem: ListItem = { book, index }
      const newList = [...state.listOfBooks, newItem]

      return {
        listOfBooks: newList,
      }
    })
  },
  removeBook: (book) => {
    set((state) => {
      const newList = state.listOfBooks.filter(item => {
        return item.book.ISBN !== book.ISBN
      })
      console.log(newList)
      
      return { 
        listOfBooks: newList 
      }
    })
  },
  resetList: () => {
    set((state) => {
      return {
        listOfBooks: []
      }
    })
  }
}))
 */