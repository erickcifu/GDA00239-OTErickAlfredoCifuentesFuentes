import axiosInstance from './axiosInstance';

// Obtener información de un cliente por ID
export const obtenerCliente = async (idCliente) => {
  try {
    const response = await axiosInstance.get(`/clientes/${idCliente}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el cliente:', error);
    throw error;
  }
};

// Actualizar información de un cliente
export const actualizarCliente = async (idCliente, datosActualizados) => {
  try {
    const response = await axiosInstance.put(`/clientes/${idCliente}`, datosActualizados);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el cliente:', error);
    throw error;
  }
};

// Eliminar un cliente por ID
export const eliminarCliente = async (idCliente) => {
  try {
    const response = await axiosInstance.delete(`/clientes/${idCliente}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el cliente:', error);
    throw error;
  }
};

// Obtener la lista de todos los clientes
export const obtenerTodosLosClientes = async () => {
  try {
    const response = await axiosInstance.get('/clientes');
    return response.data;
  } catch (error) {
    console.error('Error al obtener la lista de clientes:', error);
    throw error;
  }
};

// Crear un nuevo cliente
export const crearCliente = async (datosCliente) => {
  try {
    const response = await axiosInstance.post('/clientes', datosCliente);
    return response.data;
  } catch (error) {
    console.error('Error al crear el cliente:', error);
    throw error;
  }
};
