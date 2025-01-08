import React, { useState, useEffect } from 'react';
import api, {obtenerCliente} from '../config/axios'; 
import { useNavigate, useParams } from 'react-router-dom';

const ActualizarCliente = () => {
    const { idCliente } = useParams();
    const [cliente, setCliente] = useState({
        razon_social: '',
        nombreComercial: '',
        Nit: '',
        direccionEntrega: '',
        telefonoCliente: '',
        emailCliente: '',
    });

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchCliente = async () => {
      try {
        const idCliente = obtenerCliente();
        if (!idCliente) {
          setError('No se encontró el id del cliente en localStorage');
          return;
        }
        console.log(`Enviando solicitud para el cliente con id: ${idCliente}`);
        const response = await api.get(`/clientes/${idCliente}`);
        setCliente(response.data);  // Establecer los datos del cliente en el estado
      } catch (error) {
        console.error('Error al cargar los datos del cliente:', error);
        setError('Error al cargar los datos del cliente');
      }finally {
        setLoading(false);
      }
    };
    
    useEffect(() => {
        fetchCliente();
    }, [idCliente]);

    if (loading) return <p>Cargando órdenes...</p>;
    if (error) return <p>{error}</p>;

  if (error) {
    return <p>{error}</p>;
  }

  if (!cliente) {
    return <p>Cargando datos del cliente...</p>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente((prev) => ({ ...prev, [name]: value }));
  };

  // Enviar datos al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const idCliente = localStorage.getItem('Clientes_idClientes'); // O desde el contexto/auth
      await api.put(`/clientes/${idCliente}`, cliente);
      alert('Cliente actualizado correctamente');
      navigate('/clientes'); // Redirige a la lista de clientes o donde necesites
    } catch (error) {
      console.error('Error al actualizar cliente:', error);
      alert('Hubo un error al actualizar el cliente');
    }
  };

  return (
    <div>
      <h2>Actualizar Cliente</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Razón Social:</label>
          <input
            type="text"
            name="razon_social"
            value={cliente.razon_social}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Nombre Comercial:</label>
          <input
            type="text"
            name="nombreComercial"
            value={cliente.nombreComercial}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>NIT:</label>
          <input
            type="text"
            name="Nit"
            value={cliente.Nit}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Dirección de Entrega:</label>
          <input
            type="text"
            name="direccionEntrega"
            value={cliente.direccionEntrega}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Teléfono:</label>
          <input
            type="text"
            name="telefonoCliente"
            value={cliente.telefonoCliente}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="emailCliente"
            value={cliente.emailCliente}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Actualizar Cliente</button>
      </form>
    </div>
  );
};

export default ActualizarCliente;
