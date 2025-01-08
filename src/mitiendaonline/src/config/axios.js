import axios from 'axios';
import { jwtDecode } from "jwt-decode"; 

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const obtenerUsuario = () => {
    const token = localStorage.getItem('token'); 
  
    if (token) {
      try {
        const decodedToken = jwtDecode(token); 
        console.log(decodedToken); 
        return decodedToken.idUsuarios;  
      } catch (error) {
        console.error("Error al decodificar el token:", error.message);
      }
    }
    
    return null; 
};

export const obtenerRol = () => {
    const tokenRol = localStorage.getItem('token'); 
  
    if (tokenRol) {
      try {
        const decodedTokenR = jwtDecode(tokenRol); 
        console.log(decodedTokenR); 
        return decodedTokenR.rol_idRol;  
      } catch (error) {
        console.error("Error al decodificar el token:", error.message);
      }
    }
    
    return null;  
};


export const obtenerCliente = () => {
  const tokenCliente = localStorage.getItem('token'); 

  if (tokenCliente) {
    try {
      const decodedTokenC = jwtDecode(tokenCliente); 
      console.log("id cliente: ", decodedTokenC); 
      return decodedTokenC.Clientes_idClientes;  
    } catch (error) {
      console.error("Error al decodificar el token:", error.message);
    }
  }
  
  return null;  
};

export default api;
