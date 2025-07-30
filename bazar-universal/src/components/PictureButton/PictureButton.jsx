import PropTypes from "prop-types"
import './PictureButton.css'
export function PictureButton ({ path, isActive, mouseHover }) {
  return (
    <button className={`picture-btn ${isActive ? 'active' : ''}`} onMouseEnter={() => mouseHover(path)} >
      <img src={path} />
    </button>
  )
}

PictureButton.propTypes = {
  path: PropTypes.string,
  isActive: PropTypes.bool,
  mouseHover: PropTypes.func
}