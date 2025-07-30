import { useContext, useState } from "react"
import { FilterContext } from "../../context/FilterContext"
import './Filters.css'

export function Filters () {
  const { setFilters } = useContext(FilterContext)
  const [numPages, setNumPages] = useState(0)
  const bookGenre = ["Fantasía", "Ciencia ficción", "Zombies", "Terror"]

  const handleGenre = (event) => {
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

  return (
    <div className="filters-container">
      <div className="filters-menu">
        <div className="gender-filter">
          <label>Generos: </label>
          <select className="gender-select" name='genre' onChange={handleGenre}>
            <option value="all">Mostrar Todos</option>
            {bookGenre.map((genre, index) => <option key={index} value={genre}>{genre}</option>)}
          </select>
        </div>
        <div className="page-filter">
          <label>Numero de paginas:</label>
          <div className="page-selector">
            <input type='range' min={0} max={1000} onChange={handlePages}></input>
            <span>{numPages}</span>
          </div>
        </div>
      </div>

    </div>
  )
}