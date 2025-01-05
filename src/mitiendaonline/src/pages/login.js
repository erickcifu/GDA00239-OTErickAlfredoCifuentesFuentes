import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../config/axios';

const Login = () => {
    const [correoUsuaro, setcorreoUsuaro] = useState('');
    const [passwordUsuario, setpasswordUsuario] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await api.post('/auth/login', { correoUsuaro, passwordUsuario });
            localStorage.setItem('token', response.data.token); 
            setError('');
            navigate('/home');
        } catch (err) {
            setError(err.response ? err.response.data.message : 'Error al iniciar sesión');
        }
    };

    return (
        <div className="auth-container">
            <h2>Iniciar sesión</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre de usuario:</label>
                    <input 
                        type="text" 
                        value={correoUsuaro} 
                        onChange={(e) => setcorreoUsuaro(e.target.value)} 
                        required
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input 
                        type="passwordUsuario" 
                        value={passwordUsuario} 
                        onChange={(e) => setpasswordUsuario(e.target.value)} 
                        required
                    />
                </div>
                <button type="submit">Iniciar sesión</button>
            </form>
        </div>
    );
};

export default Login;
