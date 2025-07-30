import PropTypes from "prop-types"
import './SearchBar.css'

export function SearchBar ({ value, handleChange, placeholder, pattern, size = "medium" }) {
  return (
    <>
      <div className={`input-wrapper ${size}`}>
        <input className={`input-item ${size}`}
          id="search"
          type="text" 
          name='search'
          value={value}
          placeholder={placeholder}
          pattern={pattern}
          onChange={handleChange}
          required
        />
        <ion-icon name="search-outline" class={`input-icon ${size}`}></ion-icon>
      </div>

    </>
  )
}

SearchBar.propTypes = {
  value: PropTypes.string,
  handleChange: PropTypes.func,
  placeholder: PropTypes.string,
  pattern: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"])
}