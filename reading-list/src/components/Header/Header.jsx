import PropTypes from "prop-types"
import './Header.css'

export function Header ({children}) {
  return (
    <header className="header-bar">
      {children}
    </header>
  )
}

Header.propTypes = {
  children: PropTypes.node
}
