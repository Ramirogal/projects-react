import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSearchStore } from "../store/search"
import { SearchBar } from "./SearchBar"

export function HomePage () {
  const [ search, setSearch ] = useState('')

  const setSearchState = useSearchStore((state) => state.setSearch)
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    setSearchState(search)
    navigate(`/items?search=${search}`)
  }

  const handleChange = (event) => { //Posiblemente me convenga hacer un custom hook, que ademas guarde searchState
    setSearch((prev) => (
      prev,
      event.target.value
    ))
  }

  return (
      <div className="home">
        <img src="https://http2.mlstatic.com/static/org-img/homesnw/mercado-libre.png?v=2" alt="logo" />
      
        <form className='home-form' onSubmit={handleSubmit}>
          <SearchBar
            name='search' 
            handleChange={handleChange}
            placeholder={'laptops, smartphones, ...'}
            pattern="[A-Za-z]+" 
          />

          <button className="home-search-btn" type="submit">Buscar</button>
        </form>

      </div>
  )

}
