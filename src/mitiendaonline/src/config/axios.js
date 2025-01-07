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
    const token = localStorage.getItem('token'); 
  
    if (token) {
      try {
        const decodedToken = jwtDecode(token); 
        console.log(decodedToken); 
        return decodedToken.rol_idRol;  
      } catch (error) {
        console.error("Error al decodificar el token:", error.message);
      }
    }
    
    return null;  
};

export default api;
