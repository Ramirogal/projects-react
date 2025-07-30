import { Header } from "../Header/Header"
import { Library } from "../Library/Library"
import { useNumberBookStore } from '../../store/numberOfBooks'
import { ReadingList } from "../ReadingList/ReadingList"
import { FiltersProvider } from "../../context/FilterContext"
import { Filters } from "../Filters/Filters"
import { SideBar } from "../SideBar/SideBar"
import { useIsMobile } from "../../hooks/useIsMobile"
import { useEffect, useRef, useState } from "react"
import './HomeLayout.css'

export function HomeLayout () {
  const booksListCount = useNumberBookStore((state) => state.booksListCount)
  const booksLibraryCount = useNumberBookStore((state) => state.booksLibraryCount)
  const [show, setShow] = useState(false)
  const { isMobile } = useIsMobile()
  const sideBarRef = useRef(null)

/*   const hasBooks = booksListCount > 0 */

  const handleSideBar = () => {
    setShow(true)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
          sideBarRef.current && 
          !sideBarRef.current.contains (event.target)
      ) {
          setShow(false)
        }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="page-content">
    <FiltersProvider>
      <Header>
        {
          isMobile && (
            <div className="mobile-button-container">
              <div className="menu-button-container">
                <button className='menu-button' onClick={handleSideBar}>
                  <ion-icon name="menu"></ion-icon>
                </button>
              </div>
              <div className="book-quantity-container">
                <ion-icon name="book"></ion-icon>
                <span className='books-quantity'>{booksListCount}</span>
              </div>
            </div>
          )
        }
        <label>Registro de Lectura</label>
      </Header>
      <div className="main-content">
      {
        (!isMobile || show) && (
          <SideBar>
            <div className="side-bar" ref={sideBarRef}>
              <div className="info-books">
                  <h1>{booksLibraryCount} libros disponibles</h1>
                  {
                    booksListCount > 0 && <h3>{booksListCount} libros disponibles</h3>
                  }
              </div>
              <Filters />
              <ReadingList />
{/*               {
                hasBooks && <ReadingList />
              } */}
            </div>
          </SideBar>
  )
}
        <Library />
      </div>
    </FiltersProvider>
    </div>
  )
}
