import { create } from "zustand"

interface Product {
  id: number,
  title: string,
  description: string,
  price: number,
  discountPercentage: number,
  rating: number,
  stock: number,
  brand: number,
  category: string,
  thumbnail: string,
  images: string[]
}

interface CartItem {
  product: Product,
  quantity: number
}

interface Cart{
  productArray: CartItem[],
  addProduct: (product: Product, quantity: number) => void,
  removeProduct: (id: number) => void
}

export const useCartStore = create<Cart>(set => ({
  productArray: [],
  addProduct: (product, quantity) => {
    set((state) => {
        const existingItemIndex = state.productArray.findIndex(
          (item) => item.product.id === product.id
        )
  
        if (existingItemIndex !== -1) {
          // Si el producto ya está en el carrito, actualiza la cantidad
          const updatedArray = state.productArray.map((item, index) =>
            index === existingItemIndex
              ? { ...item, quantity: quantity }
              : item
          )
  
          return {
            productArray: updatedArray,
          }
        } else {
          // Si el producto no está en el carrito, añádelo
          return {
            productArray: [...state.productArray, { product, quantity }],
          }
        }
      

      return {
        productArray: [ ...state.productArray, { product, quantity }]
      }

    })
  },
  removeProduct: (id) => {
    set((state) => ({
      productArray: state.productArray.filter((prod) => prod.product.id !== id),
    }));
  },
}))

