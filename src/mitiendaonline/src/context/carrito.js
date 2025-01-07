import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (productos) => {
    setCart((prevCart) => {
      // Verificar si el productos ya está en el carrito
      const existingProduct = prevCart.find((item) => item.idProducto === productos.idProducto);
  
      if (existingProduct) {
        // Si el productos ya existe, actualizamos su cantidad
        return prevCart.map((item) =>
          item.idProducto === productos.idProducto
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        // Si no existe, lo agregamos al carrito
        return [...prevCart, { ...productos, cantidad: 1 }];
      }
    });
  };
  
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.idProducto !== id));
  };

  const clearCart = () => setCart([]);

  const incrementQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.idProducto === id ? { ...item, cantidad: item.cantidad + 1 } : item
      )
    );
  };
  
  const decrementQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.idProducto === id
          ? { ...item, cantidad: Math.max(item.cantidad - 1, 1) } // Evitar cantidades menores a 1
          : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, incrementQuantity, decrementQuantity }}>
      {children}
    </CartContext.Provider>
  );
};



export const useCart = () => useContext(CartContext);
