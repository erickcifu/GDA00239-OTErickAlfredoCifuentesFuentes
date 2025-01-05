import React, { useState } from 'react';
import api from '../config/axios'; // Asegúrate de tener configurado axios

const Register = () => {
    const [emailCliente, setcorreoUsuaro] = useState('');
    const [passwordUsuario, setpasswordUsuario] = useState('');
    const [nombreCompletoUsuario, setnombreCompletoUsuario] = useState('');
    const [telefonoCliente, settelefonoUsuario] = useState('');
    const [fechaNacimientoUsuario, setfechaNacimientoUsuario] = useState('');
    const [razon_social, setRazonSocial] = useState('');
    const [nombreComercial, setNombreComercial] = useState('');
    const [Nit, setNit] = useState('');
    const [direccionEntrega, setDireccionEntrega] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const estados_idestado = 1;
    const telefonoUsuario = telefonoCliente;
    const correoUsuaro = emailCliente;
    const rol_idrol = 2;
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await api.post('/auth/registro', {
                correoUsuaro,
                passwordUsuario,
                nombreCompletoUsuario,
                telefonoUsuario,
                fechaNacimientoUsuario,
                razon_social,
                nombreComercial,
                Nit,
                telefonoCliente,
                emailCliente,
                direccionEntrega,
                estados_idestado,
                rol_idrol,
            });
            setSuccessMessage(response.data.message);
            setError('');
        } catch (err) {
            setError(err.response ? err.response.data.message : 'Error al registrar');
            setSuccessMessage('');
        }
    };

    return (
        <div className="auth-container">
            <h2>Registro</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <form onSubmit={handleSubmit}>
            <div>
            <input hidden
                        type="number" 
                        value={rol_idrol} 
                    />
                    <input hidden
                        type="number" 
                        value={estados_idestado} 
                    />
                </div>
                <div>
                    <label>Correo electrónico:</label>
                    <input 
                        type="email" 
                        value={emailCliente} 
                        onChange={(e) => setcorreoUsuaro(e.target.value)} 
                        required
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input 
                        type="password" 
                        value={passwordUsuario} 
                        onChange={(e) => setpasswordUsuario(e.target.value)} 
                        required
                    />
                </div>
                <div>
                    <label>Nombre completo:</label>
                    <input 
                        type="text" 
                        value={nombreCompletoUsuario} 
                        onChange={(e) => setnombreCompletoUsuario(e.target.value)} 
                        required
                    />
                </div>
                <div>
                    <label>Teléfono:</label>
                    <input 
                        type="text" 
                        value={telefonoCliente} 
                        onChange={(e) => settelefonoUsuario(e.target.value)} 
                        required
                    />
                </div>
                {/* Datos del Cliente */}
                <div>
                    <label>Razón Social:</label>
                    <input 
                        type="text" 
                        value={razon_social} 
                        onChange={(e) => setRazonSocial(e.target.value)} 
                        required
                    />
                </div>
                <div>
                    <label>Nombre Comercial:</label>
                    <input 
                        type="text" 
                        value={nombreComercial} 
                        onChange={(e) => setNombreComercial(e.target.value)} 
                        required
                    />
                </div>
                <div>
                    <label>NIT:</label>
                    <input 
                        type="text" 
                        value={Nit} 
                        onChange={(e) => setNit(e.target.value)} 
                        required
                    />
                </div>
                <div>
                    <label>Dirección de Entrega:</label>
                    <input 
                        type="text" 
                        value={direccionEntrega} 
                        onChange={(e) => setDireccionEntrega(e.target.value)} 
                        required
                    />
                </div>
                <div>
                    <label>Fecha de nacimiento:</label>
                    <input 
                        type="date" 
                        value={fechaNacimientoUsuario} 
                        onChange={(e) => setfechaNacimientoUsuario(e.target.value)} 
                        required
                    />
                </div>
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
};

export default Register;
