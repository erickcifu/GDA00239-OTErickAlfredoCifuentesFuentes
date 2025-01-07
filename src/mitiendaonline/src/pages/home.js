import React, { useEffect, useState } from 'react';
import { Grid, Button, Typography, Card, CardContent, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import { useCart } from '../context/carrito';
import Layout from '../components/layout';
import api from '../config/axios';

const Home = () => {
  const { cart } = useCart();
  const { addToCart } = useCart();
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    api.get('/productos')
      .then(response => setProductos(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <Layout>
      <div> 
            <header>
        <Link to="/carrito" style={{ textDecoration: 'none' }}>
          <button style={{ position: 'relative', padding: '10px 20px', fontSize: '16px' }}>
            🛒 Carrito
            {cart.length > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  background: 'red',
                  color: 'white',
                  borderRadius: '50%',
                  padding: '2px 8px',
                  fontSize: '12px',
                }}
              >
                {cart.length}
              </span>
            )}
          </button>
        </Link>
      </header>
        <Grid container spacing={3} padding={3}>
          {productos.map(producto => (
            <Grid item xs={12} sm={6} md={4} key={producto.idProducto}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={producto.fotoProducto}
                  alt={producto.nombreProducto}
                />
                <CardContent>
                  <Typography variant="h6">{producto.nombreProducto}</Typography>
                  <Typography variant="body2" color="textSecondary">{producto.descripcion}</Typography>
                  <Typography variant="h6" color="primary">Q.{producto.precioProducto}</Typography>
                  {producto.stockProducto > 0 ? (
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => addToCart(producto)}
                    >
                      Añadir al carrito
                    </Button>
                  ) : (
                    <Typography variant="body2" color="error" align="center">
                      <span>No disponible</span>
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
    </div>
    </Layout>
  );
};


export default Home;
