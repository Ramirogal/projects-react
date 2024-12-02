import PropTypes from "prop-types"
import { Card } from "./Card"
import { SearchBar } from "./SearchBar"
import { useSearch } from "../hooks/useSearch" 

export function SearchPage ( ) {
  const { search, searchParam, hasProducts, products, loading, error, handleChange, handleSubmit, handleClick } = useSearch()

  return (
    <div className="search-page-container">
      <div className="input-container">
        <form onSubmit={handleSubmit}>
          <SearchBar
            name='search'
            value={search}
            handleChange={handleChange}
            placeholder={'laptops, smartphones, ...'}
            pattern="[A-Za-z]+" 
          />
        </form>
      </div>

      <div className="search-title">
        <h3>Resultados de busqueda de {searchParam}</h3>
      </div>

      <div className="results-container">
        <div className="filter-container">
          
        </div>
        <div className="result-products">
          {loading && <h1>Cargando ...</h1>}
          {error && <h1>{error.message}</h1>} {/* Mejorar la interfaz cuando se muestra error. Skeleton Loaders */}
          {
            hasProducts ? (
              <ul className='products-container'>
                {
                  products.map(product => 
                    <Card 
                      key={product.id} 
                      id={product.id} 
                      title={product.title} 
                      brand ={product.brand} 
                      description={product.description} 
                      imageURL={product.thumbnail} 
                      price={product.price} 
                      discount={product.discountPercentage} 
                      rating={product.rating} 
                      detailClick={handleClick}
                    />
                  )
                }
              </ul>
            ) : (
              !loading && <p>No se encontraron productos.</p>
            )
          }
        </div>
      </div>
    </div>
  )
}

SearchPage.proptypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      discountPercentage: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      stock: PropTypes.number.isRequired,
      brand: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
      images: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
}
