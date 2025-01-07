import React, { useEffect, useState } from 'react';
import api from '../config/axios';
import { useParams, useNavigate  } from 'react-router-dom';
import '../styles/estilos.css';

const OrdenesList = () => {
    const { idOrden } = useParams();
    const [orden, setOrden] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchOrden = async () => {
        try {
            const response = await api.get(`/orden/${idOrden}`);
            setOrden(response.data);
            console.log("Respuesta del backend:", response.data);
        } catch (err) {
            setError('Error al obtener la orden');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrden();
    }, [idOrden]); 

    if (loading) return <p>Cargando órdenes...</p>;
    if (error) return <p>{error}</p>;

    const inicio = () => {
        navigate('/home'); 
    };

    return (
        <div className="orden-container">
            <h1 className='orden-title'>Orden {orden?.orden?.idOrden}</h1>
            {orden ? (
                <div>
                     <h1>Gracias por tu compra!</h1>
                     <h3>Resumen de tu compra</h3>
                    <p><strong>Nombre:</strong> {orden.orden.nombreCompletoOrden}</p>
                    <p><strong>Total:</strong> {orden.orden.total_orden}</p>
                    <h2>Detalles:</h2>
                    <ul className="orden-details">
                        {orden.detalles.map((detalle) => (
                            <li className="detalle-list" key={detalle.Productos_idProductos}>
                                <p className='detalle-item'><strong>Producto:</strong> {detalle.nombreProducto}</p>
                                <p className='detalle-item'><strong>Cantidad:</strong> {detalle.cantidadOD}</p>
                                <p className='detalle-item'><strong>Subtotal:</strong> Q.{detalle.subtotalOD}</p>
                            </li>
                        ))}
                    </ul>
                    <button onClick={inicio} className="btn-regresar">Regresar al Inicio</button>
                </div>
            ) : (
                <p>No se encontró la orden.</p>
            )}
        </div>
    );
};

export default OrdenesList;
