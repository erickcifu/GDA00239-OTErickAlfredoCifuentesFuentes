import React, { useState, useEffect } from "react";
import { useCart } from '../context/carrito';
import Grid from '@mui/material/Grid2';
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import api , {obtenerUsuario} from '../config/axios';


const FinCompra = () => {
  const { cart, clearCart,} = useCart();
  const navigate = useNavigate(); 

  const [userId, setUserId] = useState(null); // Estado para almacenar el ID del usuario
  const [isLoading, setIsLoading] = useState(true); // Estado para evitar render mientras se verifica

  // Efecto para obtener el usuario y manejar la redirección
  useEffect(() => {
    const id = obtenerUsuario();
    if (!id) {
      alert("No se encontró el usuario. Por favor, inicia sesión.");
      navigate("/login");
    } else {
      setUserId(id);
    }
    setIsLoading(false); // Finalizar la carga
  }, [navigate]);

  const [formData, setFormData] = useState({
    usuarios_idusuarios: "",
    nombreCompletoOrden: "",
    direccionOrden: "",
    telefonoOrden: "",
    correoOrden: "",
    fecha_entrega: "",
  });

  // Actualiza usuarios_idusuarios cuando userId esté disponible
useEffect(() => {
    if (userId) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        usuarios_idusuarios: userId,
      }));
    }
  }, [userId]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
    console.log("Datos de la orden antes de enviar:", formData);
    if (cart.length === 0) {
      alert("El carrito está vacío");
      return;
    }

    const detalles = cart.map((item) => ({
      productos_idproductos: item.idProducto,
      cantidad: item.cantidad,
      precio: item.precioProducto,
      subtotal: item.cantidad * item.precioProducto,
    }));

    const orderData = {
      ...formData,
      detalles,
    };

    try {
        const response = await api.post("/orden", orderData);
        if (response.status === 200 || response.status === 201) {
          alert("Orden enviada con éxito");
          clearCart();
          // Accede al idOrden desde la estructura correcta
        const orderId = response.data.nuevaOrden[0][0]?.idOrden;

        if (!orderId) {
        console.error("No se pudo obtener el ID de la orden");
        alert("Hubo un problema al procesar la orden");
        return;
        }

        navigate(`/orden/${orderId}`);
        } else {
          alert("Hubo un error al procesar la orden");
        }
      } catch (error) {
        console.error("Error al enviar la orden:", error);
        alert("Error al procesar la orden");
      }
    };

    
  return (
    <Box padding={3}>
      <Typography variant="h4" gutterBottom>
        Finalizar Compra
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Nombre Completo"
            name="nombreCompletoOrden"
            value={formData.nombreCompletoOrden}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Dirección"
            name="direccionOrden"
            value={formData.direccionOrden}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Teléfono"
            name="telefonoOrden"
            value={formData.telefonoOrden}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Correo Electrónico"
            name="correoOrden"
            value={formData.correoOrden}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            type="date"
            label="Fecha de Entrega"
            name="fecha_entrega"
            value={formData.fecha_entrega}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
        </Grid>
      </Grid>
      <Box marginTop={3}>
        <Button variant="contained" color="primary" onClick={handleCheckout}>
          Confirmar Compra
        </Button>
      </Box>
    </Box>
  );
};

export default FinCompra;
