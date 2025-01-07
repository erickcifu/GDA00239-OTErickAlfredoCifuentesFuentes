import React from 'react';
import { useCart } from '../context/carrito';
import { useNavigate } from "react-router-dom";
import { Box, Typography, List, ListItem, ListItemText, Button, Divider, Link } from '@mui/material';
import Layout from '../components/layout';

const Carrito = () => {
  const { cart, removeFromCart, clearCart, incrementQuantity, decrementQuantity} = useCart();

  const total = cart.reduce((acc, item) => acc + item.precioProducto * item.cantidad, 0);

  const navigate = useNavigate(); 

  const handleConfirmarCompra = () => {
    console.log('Realizando el pedido:', cart);
    navigate("/comprar");
  };

  const inicio = () => {
    navigate('/home'); 
};

  return (
    <Layout>
    <Box padding={3}>
      <Typography variant="h4" gutterBottom>
        Carrito de compras
      </Typography>
      <List>
        {cart.map((item) => (
          <ListItem key={item.idProducto}>
            <ListItemText
              primary={item.nombreProducto}
              secondary={`Precio: Q.${item.precioProducto} | Subtotal: Q.${item.precioProducto * item.cantidad}`}
            />
              <Box display="flex" alignItems="center" gap={1}>
                <Button onClick={() => decrementQuantity(item.idProducto)} color="secondary" size="small" style={{ fontSize: '25px' }} >
                  -
                </Button>
                <Typography variant="body1">{item.cantidad}</Typography>
                <Button onClick={() => incrementQuantity(item.idProducto)} color="primary" size="small" style={{ fontSize: '20px' }} >
                  +
                </Button>
              </Box>
            <Button onClick={() => removeFromCart(item.idProducto)} color="secondary">
              Quitar
            </Button>
          </ListItem>
        ))}
      </List>
      <Divider style={{ margin: "20px 0" }} />
      {cart.length > 0 ? (
        <>
          <Typography variant="h6">Total: Q.{total.toFixed(2)}</Typography>
          <Box marginTop={2}>
            <Button variant="contained" color="primary" onClick={handleConfirmarCompra}>
              Confirmar compra
            </Button>
            <Button variant="outlined" color="secondary" onClick={clearCart} style={{ marginLeft: "1rem" }}>
              Vaciar carrito
            </Button>
              <Button variant="outlined" color="warning" onClick={inicio} style={{ marginLeft: "1rem" }}>
                Seguir comprando
              </Button>
          </Box>
        </>
      ) : (
        <Box>
        <Typography>No hay productos en el carrito.</Typography>
        <Button variant="outlined" color="warning" onClick={inicio} style={{ marginLeft: "1rem" }}>
                Comprar
              </Button>
          </Box>
      )}
    </Box>
    </Layout>
  );
};
    
    export default Carrito;
    
        