import { useSearch } from "../hooks/useSearch";
import { NavBar } from "./NavBar";

export function ShoppingCart () {
  const { search, handleChange, handleSubmit } = useSearch()

  return (
    <div className="shopping-cart-page">
      <NavBar search={search} handleChange={handleChange} handleSubmit={handleSubmit} />
      <div>
        
      </div>
    </div>
  )
}