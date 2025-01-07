import React, { useEffect, useState } from 'react';
import { Grid, Button, Typography, Card, CardContent } from '@mui/material';
import { useCliente } from '../context/cliente';
import { Link } from 'react-router-dom';
import api from '../config/axios';

const Clientes = () => {
  const { cliente, historialCompras, setHistorial } = useCliente();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular llamada para obtener historial de compras
    api.get(`/compras/${cliente?.idCliente}`)
      .then(response => {
        setHistorial(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al cargar el historial de compras:', error);
        setLoading(false);
      });
  }, [cliente, setHistorial]);

  if (!cliente) {
    return (
      <div>
        <Typography variant="h4" align="center" gutterBottom>
          No has iniciado sesión
        </Typography>
        <Typography align="center">
          Por favor, <Link to="/login">inicia sesión</Link> para ver tu información.
        </Typography>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Bienvenido, {cliente.nombre}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Información de contacto: {cliente.email}
      </Typography>

      <Typography variant="h5" gutterBottom>
        Historial de Compras
      </Typography>

      {loading ? (
        <Typography variant="body1">Cargando...</Typography>
      ) : historialCompras.length > 0 ? (
        <Grid container spacing={3}>
          {historialCompras.map((compra) => (
            <Grid item xs={12} sm={6} md={4} key={compra.idCompra}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    {compra.nombreProducto}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Fecha: {new Date(compra.fecha).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body1" color="primary">
                    Total: Q.{compra.total}
                  </Typography>
                  <Typography variant="body2">
                    Estado: {compra.estado}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1">No tienes compras registradas.</Typography>
      )}

      <div style={{ marginTop: '20px' }}>
        <Button variant="contained" color="primary" component={Link} to="/productos">
          Ver Productos
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          style={{ marginLeft: '10px' }}
          component={Link}
          to="/perfil"
        >
          Editar Perfil
        </Button>
      </div>
    </div>
  );
};

export default Clientes;
