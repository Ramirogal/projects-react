import PropTypes from "prop-types"
import './SideBar.css'

export function SideBar ({ children }) {
  return (
    <>
      {children}
    </>
  )
}

SideBar.propTypes = {
  children: PropTypes.node
}