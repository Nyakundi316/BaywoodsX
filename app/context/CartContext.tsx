'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext({
  cartCount: 0,
  setCartCount: (count: number) => {},
})

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const stored = localStorage.getItem('cartCount')
    if (stored) setCartCount(Number(stored))
  }, [])

  useEffect(() => {
    localStorage.setItem('cartCount', String(cartCount))
  }, [cartCount])

  return (
    <CartContext.Provider value={{ cartCount, setCartCount }}>
      {children}
    </CartContext.Provider>
  )
}
