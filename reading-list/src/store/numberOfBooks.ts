import { create } from "zustand"
import { persist } from "zustand/middleware";
import { library} from "../mocks/books.json"


interface NumberOfBooks {
  booksLibraryCount: number,
  booksListCount: number,
  incrementLibraryCount: () => void,
  decrementLibraryCount: () => void,
  incrementListCount: () => void,
  decrementListCount: () => void,
  setBooksLibraryCount: (newValue: number) => void,
  setBooksListCount: (newValue: number) => void
}

export const useNumberBookStore = create<NumberOfBooks>()(
  persist(
    (set) => ({
      booksLibraryCount: library.length,
      booksListCount: 0,
      incrementLibraryCount: () => {
        set((state) => ({
          booksLibraryCount: state.booksLibraryCount + 1,
        }));
      },
      decrementLibraryCount: () => {
        set((state) => ({
          booksLibraryCount: state.booksLibraryCount - 1,
        }));
      },
      incrementListCount: () => {
        set((state) => ({
          booksListCount: state.booksListCount + 1,
        }));
      },
      decrementListCount: () => {
        set((state) => ({
          booksListCount: state.booksListCount - 1,
        }));
      },
      setBooksLibraryCount: (value) => {
        set(() => ({
          booksLibraryCount: value,
        }));
      },
      setBooksListCount: (value) => {
        set(() => ({
          booksListCount: value,
        }));
      },
    }),
    {
      name: "number-of-books-storage",
      partialize: (state) => ({
        booksLibraryCount: state.booksLibraryCount,
        booksListCount: state.booksListCount,
      })
    }
  )
);


/* export const useNumberBookStore = create<NumberOfBooks>((set) => ({
  booksLibraryCount: library.length,
  booksListCount: 0,
  incrementLibraryCount: () => {
    set((state) => {
      return {
        booksLibraryCount: state.booksLibraryCount + 1
      }
    })
  },
  decrementLibraryCount: () => {
    set((state) => {
      return {
        booksLibraryCount: state.booksLibraryCount - 1
      }
    })
  },
  incrementListCount: () => {
    set((state) => {
      return {
        booksListCount: state.booksListCount + 1
      }
    })
  },
  decrementListCount: () => {
    set((state) => {
      return {
        booksListCount: state.booksListCount - 1
      }
    })
  },
  setBooksLibraryCount: (value) => {
    set((state) => {
      return {
        booksLibraryCount: value
      }
    })
  },
  setBooksListCount: (value) => {
    set((state) => {
      return {
        booksListCount: value
      }
    })
  }
})) */
