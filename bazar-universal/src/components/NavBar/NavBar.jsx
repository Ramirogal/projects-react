import { useNavigate } from "react-router-dom"
import { SearchBar } from "../SearchBar/SearchBar"
import PropTypes from "prop-types"
import { useState, useEffect, useRef, useMemo } from "react"
import { ItemCart } from "../ItemCart/ItemCart"
import './NavBar.css'
import { useIsMobile } from "../../hooks/useIsMobile"

export function NavBar ({ search, handleChange, handleSubmit, cart, quantity, removeItem }) {
  const [ show, setShow ] = useState(false)
  const [ showMenu, setShowMenu ] = useState(false)
  const cartBoxRef = useRef(null)
  const cartBtnRef = useRef(null)
  const menuRef = useRef(null)
  const isMobile = useIsMobile()

  const hasProducts = cart.length > 0
  const totalCartPrice = useMemo(() => {
    if (hasProducts) {
      return cart.reduce((total, item) =>
        total + (item.product.price * item.quantity), 0)
    } else return 0
  }, [cart, hasProducts])

  const handleCart = () => {
    setShow(prev => !prev)
  }

  const handleCartMobile = () => {
    console.log("Falta crear carrito")
  }

  const handleRemoveProduct = (id) => {
    removeItem(id)
  }

  const handleSlider = () => {
    setShowMenu(prev => !prev)
  }

  const focusSearch = () => {
    document.getElementById('search').focus()
    setShowMenu(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        cartBoxRef.current &&
        !cartBoxRef.current.contains(event.target) &&
        cartBtnRef.current &&
        !cartBtnRef.current.contains(event.target)
      ) {
        setShow(prev => !prev)
      }
      
      if (
          menuRef.current && 
          !menuRef.current.contains(event.target)
        ) {
          setShowMenu(false)
        }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [])

  const navigate = useNavigate()
  const backToHome = () => {
    navigate('/')
  }

  return (
    <header className="nav-header">
        <nav className="nav-bar">
          <div className="home-btn-container">
            <button className="home-btn" onClick={backToHome}>
              <img src="https://companieslogo.com/img/orig/MELI-ec0c0e4f.png?t=1720244492" alt="logo-inicio" />
            </button>
          </div>
          <div className="menu-btn-container">
            <button onClick={handleSlider}>
              <ion-icon name="menu-sharp"></ion-icon>
            </button>
          </div>
          <div className={`slider-menu ${showMenu ? 'isSelected' : ''}`} ref={menuRef}>
            <div className="close-btn-container">
              <button className="close-btn" onClick={handleSlider}>
                <ion-icon name="close"></ion-icon>
              </button>
            </div>
            <ul>
              <li className="slider-menu-item" onClick={backToHome}>
                <span className="menu-icon"><ion-icon name="home-outline"></ion-icon></span>
                <span >Home</span>
              </li>
              <li className="slider-menu-item" onClick={focusSearch}>
                <span className="menu-icon"><ion-icon name="search-outline"></ion-icon></span>
                <span>Search</span>
              </li>
              <li className="slider-menu-item">
                <span className="menu-icon"><ion-icon name="notifications-outline"></ion-icon></span>
                <span>Notifications</span>
              </li>
              <li className="slider-menu-item">
                <span className="menu-icon"><ion-icon name="heart-outline"></ion-icon></span>
                <span>Favourites</span>
              </li>

            </ul>
          </div>
          <div className="input-container">
            <form onSubmit={handleSubmit}>
              <SearchBar
                name='search'
                value={search}
                handleChange={handleChange}
                placeholder={'laptops, smartphones, ...'}
                pattern="[A-Za-z]+"
                size={`${isMobile ? 'small' : 'large'}`}
              />
            </form>
          </div>
          <div className="cart-container">
            <button ref={cartBtnRef} className="cart-btn" onClick={handleCart}>
              <ion-icon name="cart-outline"></ion-icon>
              {
                quantity > 0 && (
                  <span className="cart-quantity">{quantity}</span>
                )
              }
            </button>
            {
              show && (
              <div ref={cartBoxRef} className='cart-box'>
                <div className="cart-iconup">
                  <ion-icon name="caret-up-outline"></ion-icon>
                </div>
                <div className="cart-header">
                  <span>Shopping Cart</span>
                </div>
                <div className="cart-content"> 
                  {
                    quantity ? (
                      <ul className="cart-item-container">
                        {
                          cart.map((product, index) => (
                            <ItemCart
                              key={index}
                              index={index}
                              id={product.product.id}
                              title={product.product.title} 
                              thumbnail={product.product.thumbnail} 
                              price={product.product.price}
                              quantity={product.quantity}
                              removeItem={handleRemoveProduct}
                              />
                            ))
                        }
                      </ul>
                    ) : (
                      <h3 className="cart-empty">Your cart is empty</h3>
                    )
                  }
  
                </div>
                <div className="cart-footer">
                  {
                    hasProducts && (
                      <div className="total-price-info">
                        <span className="total-span">Total: </span>
                        <span>$ {totalCartPrice}</span>
                      </div>
                    )
                  }
                  <button className="go-cart-btn">Go to cart</button>
                </div>
  
              </div>
              )
            }
          </div>

          <div className="cart-btn-container-mobile">
            <button ref={cartBtnRef} className="cart-btn" onClick={handleCartMobile}>
              <ion-icon name="cart-outline"></ion-icon>
              {
                quantity > 0 && (
                  <span className="cart-quantity">{quantity}</span>
                )
              }
            </button>
          </div>

        </nav>
      </header>
  )
}

NavBar.propTypes = {
  search: PropTypes.string,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  backToHome: PropTypes.func,
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      product: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        brand: PropTypes.string,
        description: PropTypes.string,
        imageURL: PropTypes.string,
        price: PropTypes.number,
        discount: PropTypes.number,
        rating: PropTypes.number,
        detailClick: PropTypes.func,
        image: PropTypes.shape(PropTypes.string)
      }).isRequired,
      quantity: PropTypes.number
    }).isRequired
  ),
  quantity: PropTypes.number,
  removeItem: PropTypes.func
}