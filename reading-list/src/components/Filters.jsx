import { useContext, useState } from "react"
import { FilterContext } from "../context/filters"


export function Filters () {
  const [showFilter, setShowFilter] = useState(true)

  const { setFilters } = useContext(FilterContext)
  const [numPages, setNumPages] = useState(0)
  const bookGenre = ["Fantasía", "Ciencia ficción", "Zombies", "Terror"]

  const handleClick = () => {
    setShowFilter(!showFilter)
  }

  const handleGenre = (event) => {
    console.log(event.target.value)
    setFilters(prevFilter => ({
      ...prevFilter,
      genre: event.target.value
    }))
  }

  const handlePages = (event) => {
    const selectedPages = event.target.value
    setNumPages(selectedPages)
    setFilters(prevFilter => ({
      ...prevFilter,
      pages: selectedPages
    }))
  }
  
  const handleGenreMobile = (genre) => {
    setFilters(prevFilter => ({
      ...prevFilter,
      genre: genre
    }))
  }


  return (
    <div className="filters-container">
      <button className="filter-btn" onClick={handleClick}>
        Filtrar
        <ion-icon name="options-outline"></ion-icon>
      </button>

      <div className={`filters-menu-mobile ${showFilter ? 'hide' : 'show'}`}>
        <ion-icon name="close-outline" onClick={handleClick}></ion-icon>
        <label>Filtrar</label>
        <button onClick={() => {handleGenreMobile('all')}}>Mostrar Todos</button>
        <button onClick={() => {handleGenreMobile('Fantasía')}}>Fantasía</button>
      </div>

      <div className="filters-menu">
        <div className="gender-filter">
          <label>Filtrar por genero</label>
          <select name='genre' onChange={handleGenre}>
            <option value="all">Mostrar Todos</option>
            {bookGenre.map((genre, index) => <option key={index} value={genre}>{genre}</option>)}
          </select>
        </div>
        <div className="page-filter">
          <label>Filtrar por numero de paginas</label>
          <div>
            <input type='range' min={0} max={1000} onChange={handlePages}></input>
            <span>{numPages}</span>
          </div>
        </div>
      </div>

    </div>
  )
}