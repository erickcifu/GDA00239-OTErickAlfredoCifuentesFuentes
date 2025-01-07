import React, { useState, useEffect } from 'react';
import axiosInstance from '../../services/axiosInstance';

const GestionProductos = () => {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({ nombre: '', precio: '' });

  useEffect(() => {
    const fetchProductos = async () => {
      const { data } = await axiosInstance.get('/productos');
      setProductos(data);
    };
    fetchProductos();
  }, []);

  const handleAdd = async () => {
    try {
      const { data } = await axiosInstance.post('/productos', nuevoProducto);
      setProductos([...productos, data]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/productos/${id}`);
      setProductos(productos.filter((prod) => prod.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Gestión de Productos</h3>
      <input
        type="text"
        placeholder="Nombre"
        onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
      />
      <input
        type="number"
        placeholder="Precio"
        onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: e.target.value })}
      />
      <button onClick={handleAdd}>Agregar Producto</button>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>
            {producto.nombre} - ${producto.precio}
            <button onClick={() => handleDelete(producto.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GestionProductos;
