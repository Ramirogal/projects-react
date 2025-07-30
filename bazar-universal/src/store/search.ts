import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

interface SearchState {
  search: string,
  setSearch: (p_search: string) => void
}

const storage = createJSONStorage(() => sessionStorage)

export const useSearchStore = create<SearchState>()(
  persist(
    (set) => ({
      search: '',
      setSearch: (p_search) => set({ search: p_search })
    }),
    {
      name: 'search-storage',
      storage: storage
    }
  )
)

/* export const useSearchStore = create<SearchState>((set) => ({
  search: '',
  setSearch: (p_search) => set({ search: p_search })
})) */