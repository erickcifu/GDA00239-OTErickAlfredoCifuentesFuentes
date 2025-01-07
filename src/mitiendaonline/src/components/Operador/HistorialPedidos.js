import React, { useState, useEffect } from 'react';
import axiosInstance from '../../services/axiosInstance';

const HistorialPedidos = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      const { data } = await axiosInstance.get('/pedidos');
      setPedidos(data);
    };
    fetchPedidos();
  }, []);

  const actualizarEstado = async (id, estado) => {
    try {
      await axiosInstance.put(`/pedidos/${id}`, { estado });
      setPedidos(
        pedidos.map((pedido) =>
          pedido.id === id ? { ...pedido, estado } : pedido
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Historial de Pedidos</h3>
      <ul>
        {pedidos.map((pedido) => (
          <li key={pedido.id}>
            {pedido.cliente}: {pedido.producto} - {pedido.estado}
            <button onClick={() => actualizarEstado(pedido.id, 'En Proceso')}>En Proceso</button>
            <button onClick={() => actualizarEstado(pedido.id, 'Completado')}>Completado</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistorialPedidos;
