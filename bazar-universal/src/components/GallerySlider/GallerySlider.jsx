import PropTypes from "prop-types"
import './GallerySlider.css'

export function GallerySlider ({ images }) {
  return (
    <div className="slider-container">
      <div className="slider">
        {
          images.map((url, index) => (
            <img key={index} src={url} />
          ))
        }
      </div>
    </div>

  )
}

GallerySlider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string)
}