import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';
import axiosInstance from '../services/axiosInstance';

const LoginPage = () => {
  const [correoUsuaro, setcorreoUsuaro] = useState('');
  const [passwordUsuario, setpasswordUsuario] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/auth/login', { correoUsuaro, passwordUsuario });
      navigate('/home'); 
      localStorage.setItem('token', response.data.token);
    } catch (err) {
      setError('Credenciales inválidas. Por favor, intenta de nuevo.');
    }
  };

  return (
   <Box
             display="flex"
             flexDirection="column"
             alignItems="center"
             justifyContent="center"
             minHeight="100vh"
             padding={3}
           >
             <Typography variant="h4" gutterBottom>
               Iniciar sesión
             </Typography>
             {error && <Alert severity="error">{error}</Alert>}
             <Box component="form" onSubmit={handleSubmit} width="100%" maxWidth="400px">
               <TextField
                 label="Correo electrónico"
                 type="email"
                 fullWidth
                 margin="normal"
                 value={correoUsuaro}
                 onChange={(e) => setcorreoUsuaro(e.target.value)}
                 required
               />
               <TextField
                 label="Contraseña"
                 type="password"
                 fullWidth
                 margin="normal"
                 value={passwordUsuario}
                 onChange={(e) => setpasswordUsuario(e.target.value)}
                 required
               />
               <Button type="submit" variant="contained" color="primary" fullWidth>
                 Ingresar
               </Button>
             </Box>
           </Box>
  );
};

export default LoginPage;
