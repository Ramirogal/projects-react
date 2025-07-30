import { SearchBar } from "../SearchBar/SearchBar"
import './HomePage.css'
import { useSearch } from "../../hooks/useSearch"

export function HomePage () {
  const { search, handleChange, handleSubmit } = useSearch()

  return (
      <div className="home-page">
        <div className="home">
          <div className="home-image-container">
            <img src="https://companieslogo.com/img/orig/MELI-ec0c0e4f.png?t=1720244492" alt="logo" />
          </div>

          <div className="home-form-container">
            <h2>What are you looking for?</h2>
            <form className='home-form' onSubmit={handleSubmit}>
              <SearchBar
                name='search' 
                value={search}
                handleChange={handleChange}
                placeholder={'laptops, smartphones, ...'}
                pattern="[A-Za-z]+"
              />
              <button className="home-search-btn" type="submit">Search</button>
            </form>
          </div>

        </div>
      </div>
  )

}
