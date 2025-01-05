import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
        } else {
            // Puedes hacer una solicitud a tu backend para obtener información del usuario si es necesario
            setUser({ username: 'UsuarioEjemplo' });
        }
    }, [navigate]);

    return (
        <div>
            <h1>Bienvenido, {user ? user.username : 'Cargando...'}</h1>
            <button onClick={() => {
                localStorage.removeItem('token');
                navigate('/');
            }}>Cerrar sesión</button>
        </div>
    );
};

export default Home;
