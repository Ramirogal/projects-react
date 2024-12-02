import PropTypes from "prop-types"

export function SearchBar ({ value, handleChange, placeholder, pattern }) {

  return (
    <>
      <div className="input-wrapper">
        <input
          type="text" 
          name='search'
          value={value}
          placeholder={placeholder}
          pattern={pattern}
          onChange={handleChange}
          required
        />
        <ion-icon name="search-outline" class="input-icon"></ion-icon>
      </div>

    </>
  )
}

SearchBar.propTypes = {
  value: PropTypes.string,
  handleChange: PropTypes.func,
  placeholder: PropTypes.string,
  pattern: PropTypes.string
}