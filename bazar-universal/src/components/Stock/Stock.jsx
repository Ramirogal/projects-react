import { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import './Stock.css'

export function Stock ({ stock, quantity, setQuantity, error, setError }) {
  const [quantityInput, setQuantityInput] = useState('')
  const [showSelector, setShowSelector] = useState(false)
  const [showInput, setShowInput] = useState(false)
  const stockLarger5 = stock > 5

  const handleChange = (event) => {
    let value = event.target.value.replace(/[^0-9]/g, '')
    if (value.startsWith('0')) {
      value = value.replace(/^0+/, '')
    }
    setQuantityInput(value)
    if (error) setError(null)
  }

  const handleSubmit = () => {
    const numberQuantity = Number(quantityInput)
    if (numberQuantity <= stock && numberQuantity !== 0) {
      setQuantity(numberQuantity)
      setQuantityInput('')
      setShowInput(false)
      setShowSelector(false)
    } else if (numberQuantity !== quantity) {
      setError('Without Stock')
    }
  }
  
  const handleSelector = () => {
    setShowSelector(prev => !prev)
/*       if (showInput) setShowInput(false) */
  }

  const selectQuantity = (value) => {
    setQuantity(value)
    setShowSelector(false)
    setShowInput(false)
    setQuantityInput('')
  }
  
  const selectBoxRef = useRef(null)
  const selectBtnRef = useRef(null)
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
          selectBoxRef.current && 
          !selectBoxRef.current.contains(event.target) && 
          selectBtnRef.current && 
          !selectBtnRef.current.contains(event.target)
      ) {
        setShowSelector(false)
/*         setShowInput(false) */
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [])

  return (
    <div className="product-stock">
      <div className="selector-container">
        <div className='quantity-selector-container'>
          <button className="quantity-selector-btn" ref={selectBtnRef} onClick={handleSelector}>
            <label className="quantity-label">
              Quantity: <span>{quantity} {quantity > 1 ? 'units':'unit'}</span>
            </label>
            <ion-icon name="chevron-down-outline" class='selection-icon'></ion-icon>
            {
              stock > 10 ? (
                <span className="stock-available"> (+10 available)</span>
              ) : (
                <span className="stock-available"> ({stock} available)</span>
              )
            }
          </button>

        </div>
        <ul className="selector-box" ref={selectBoxRef}>
          {
            showSelector && (
              <>
                <li className={`quantity-btn ${ 1 === quantity ? 'isSelected' : '' }`}>
                  <button onClick={() => selectQuantity(1)}>
                    1 unit
                  </button>
                </li>
                {
                  !stockLarger5 && (
                    Array.from({ length: stock - 1 }).map((_, index) => (
                      <li className={`quantity-btn ${ index + 2 === quantity ? 'isSelected' : '' }`} key={index}>
                        <button onClick={() => selectQuantity(index + 2)}>
                          {index + 2}
                        </button>
                      </li>
                    ))
                  )
                }
                {
                  stockLarger5 && (
                    <>
                      {
                        Array.from({ length: 4 }).map((_, index) => (
                          <li className={`quantity-btn ${ index + 2 === quantity ? 'isSelected' : '' }`} key={index}>
                            <button onClick={() => selectQuantity(index + 2)}>
                              {index + 2} units
                            </button>
                          </li>
                        ))
                      }
                      {
                        !showInput && (
                          <li className="quantity-btn">
                            <button onClick={() => { setShowInput(true)}}>More than 5 units</button>
                          </li>
                        )
                      }

                      {
                        showInput && (
                          <li className='quantity-input-container'>
                            <div className='quantity-input-box'>
                              <label className='input-label'>Quantity</label>
                              <div className='input-box'>
                                <input 
                                  className='input-text'
                                  autoFocus
                                  type="text"
                                  value={quantityInput}
                                  onChange={handleChange} 
                                  onKeyDown={(event) => { event.key === 'Enter' && handleSubmit() }}
                                />
                                <button className='apply-btn' type="submit" onClick={handleSubmit}>Apply</button>
                              </div>
                              <div className='quantity-error'>
                                {
                                  error && (
                                    <>
                                      <ion-icon name="alert-circle"></ion-icon>
                                      <span>{error}</span>
                                    </>
                                  )
                                }
                              </div>

                            </div>
                          </li>
                      )
                    }
                    </>
                  )
                }
              </>
            )
          }
        </ul>
      </div>
    </div>
  )
}

Stock.propTypes = {
  stock: PropTypes.number,
  quantity: PropTypes.number,
  setQuantity: PropTypes.func,
  error: PropTypes.string,
  setError: PropTypes.func
}