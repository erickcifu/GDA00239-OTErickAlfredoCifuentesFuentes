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
    const token = localStorage.getItem('token'); // Obtener el token desde el almacenamiento local
  
    if (token) {
      try {
        const decodedToken = jwtDecode(token); 
        console.log(decodedToken); // Usando jwtDecode
        return decodedToken.idUsuarios;  // Suponiendo que el token contiene un campo "id"
      } catch (error) {
        console.error("Error al decodificar el token:", error.message);
      }
    }
    
    return null;  // Si no hay token o no se puede decodificar, retorna null
};


export default api;
