import { create } from "zustand"
interface SearchState {
  search: string,
  setSearch: (p_search: string) => void
}

export const useSearchStore = create<SearchState>((set) => ({
  search: '',
  setSearch: (p_search) => set({ search: p_search })
}))