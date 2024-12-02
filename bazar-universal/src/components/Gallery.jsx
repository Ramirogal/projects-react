import PropTypes from "prop-types"
import { PictureButton } from "./PictureButton"
import { useState } from "react"

export function Gallery ({ thumbnail, images, title }) {
  const [ picture, setPicture ] = useState('')

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
      <div className="main-image">
        <img src={picture === '' ? thumbnail : picture} alt={title} />
      </div>
    </div>
  )
}

Gallery.propTypes = {
  thumbnail: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string
}