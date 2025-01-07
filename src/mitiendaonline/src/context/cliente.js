import React, { createContext, useState, useContext } from 'react';

const ClienteContext = createContext();

export const ClienteProvider = ({ children }) => {
  const [cliente, setCliente] = useState(null); // Información del cliente logueado
  const [historialCompras, setHistorialCompras] = useState([]); // Historial de compras del cliente

  const setClienteData = (data) => setCliente(data);
  const clearClienteData = () => setCliente(null);

  const setHistorial = (list) => setHistorialCompras(list);
  const addCompra = (compra) => setHistorialCompras((prev) => [...prev, compra]);

  return (
    <ClienteContext.Provider
      value={{
        cliente,
        setClienteData,
        clearClienteData,
        historialCompras,
        setHistorial,
        addCompra,
      }}
    >
      {children}
    </ClienteContext.Provider>
  );
};

export const useCliente = () => useContext(ClienteContext);
