import PropTypes from "prop-types"
import { useSearch } from "../../hooks/useSearch" 
import { NavBar } from "../NavBar/NavBar"
import { useCartStore } from "../../store/cart"
import { Footer } from "../Footer/Footer"
import './SearchPage.css'
import { Card } from "../Card/Card"
import { useSearchProducts } from "../../hooks/useSearchProducts"

export function SearchPage () {
  const { search, searchParam, handleChange, handleSubmit, searchOnChange } = useSearch()

  const { products, hasProducts, loading, error, handleClickProduct, brandsArray, pricesArray } = useSearchProducts(searchOnChange)
  const resultsNumber = products.length
  const cart = useCartStore(state => state.productArray)
  const quantity = cart.length
  const removeProduct = useCartStore(state => state.removeProduct)

  return (
    <div className="search-page-container">
      <NavBar 
        search={search} 
        handleChange={handleChange} 
        handleSubmit={handleSubmit}
        cart={cart}
        quantity={quantity}
        removeItem={removeProduct}
      />

      <div className="results-container">
        <div className="search-aside">
          <div className="search-title">
            <h3>Results for {`"`}{searchParam}{`"`}</h3>
            <p>{resultsNumber} products</p>
            </div>
          <div className="filter-container">
            <div className="filter-brand">
              <h3>Brand</h3>
              <ul className="brand-list">
                {
                  brandsArray.map(([brand, count], index) => (
                    <li className='brand-list-item' key={index}>
                      <span>{brand}</span>
                      <span>({count})</span>
                    </li>
                  ))
                }
              </ul>
            </div>

            <div className="filter-price">
              <h3>Price</h3>
              <ul className='price-list'>
                {
                  pricesArray.map(([range, count], index) => (
                    <li className='price-list-item' key={index}>
                      <span>{range}</span>
                      <span>({count})</span>
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>
        <div className="result-products">
          {
            loading && (
            <>
              <h1>Cargando ...</h1>
              {/* <Card /> */}
            </>
            )
          }
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
                      detailClick={handleClickProduct}
                      isLoading={loading}
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
      <Footer />
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
