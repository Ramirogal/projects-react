import PropTypes from "prop-types"
import { PictureButton } from "../PictureButton/PictureButton"
import './Gallery.css'
import { GallerySlider } from "../GallerySlider/GallerySlider"

export function Gallery ({ thumbnail, images, title, picture, setPicture, setBackgroundPosition, mouseMoving, setMouseMoving }) {
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    setBackgroundPosition(`${x}% ${y}%`)
    if (mouseMoving === false) setMouseMoving(true)
  }

  return (
    <div className="image-container">
      <div className="gallery-container" >
        <PictureButton 
          path={thumbnail} 
          isActive={picture === thumbnail}
          mouseHover={setPicture}
        />
        {
          images.map((path, index) => (
            <PictureButton 
              key={index}
              path={path}
              isActive={picture === path}
              mouseHover={setPicture}
              
            />
          ))
        }
      </div>

      <div className="main-image-container">
        <img 
          className='main-img' 
          src={picture}
          alt={title}
          onMouseMove={handleMouseMove}
          onMouseLeave={()=>setMouseMoving(false)}
        />
      </div>
{/*       <GallerySlider images={images} /> */}
    </div>
  )
}

Gallery.propTypes = {
  thumbnail: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  picture: PropTypes.string,
  setPicture: PropTypes.func,
  setBackgroundPosition: PropTypes.func,
  mouseMoving: PropTypes.bool,
  setMouseMoving: PropTypes.func
}
