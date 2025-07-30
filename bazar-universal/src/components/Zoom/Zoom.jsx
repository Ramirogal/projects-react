import PropTypes from "prop-types"
import './Zoom.css'

export function Zoom ({ imageURL, backgroundPosition }) {
  return (
    <div
      className="zoom-image"
      style={{ backgroundImage: `url(${imageURL})`,
        backgroundPosition,
      }}
    >
    </div>
  )
}

Zoom.propTypes = {
  imageURL: PropTypes.string,
  backgroundPosition: PropTypes.string
}