import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Modal, Box, Typography, Paper } from '@mui/material';
import api from '../config/axios';  // Suponiendo que tienes configurada una API para las solicitudes
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout';

const OrdenesCliente = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [ordenSeleccionada, setOrdenSeleccionada] = useState(null);
  const navigate = useNavigate();

  // Obtener las órdenes del usuario logueado
  useEffect(() => {
    const fetchOrdenes = async () => {
      try {
        const response = await api.get('/orden');  // Cambia la URL según corresponda
        setOrdenes(response.data);
      } catch (error) {
        console.error("Error al obtener las órdenes:", error);
      }
    };

    fetchOrdenes();
  }, []);

  // Abrir modal con detalles de la orden
  const verDetalles = (orden) => {
    setOrdenSeleccionada(orden);
    setOpenModal(true);
  };

  // Cerrar el modal
  const cerrarModal = () => {
    setOpenModal(false);
    setOrdenSeleccionada(null);
  };

  // Cancelar orden
  const cancelarOrden = async (idOrden) => {
    try {
      await api.delete(`/orden/${idOrden}/cancelar`);  // Cambia la URL según corresponda
      setOrdenes(ordenes.filter(orden => orden.idOrden !== idOrden));  // Eliminar la orden de la lista
      cerrarModal();
    } catch (error) {
      console.error("Error al cancelar la orden:", error);
    }
  };

  return (
    <Layout>
    <div>
      <Typography variant="h4" gutterBottom>Mis Órdenes</Typography>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID Orden</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Dirección</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Correo</TableCell>
              <TableCell>Fecha de Entrega</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ordenes.map((orden) => (
              <TableRow key={orden.idOrden}>
                <TableCell>{orden.idOrden}</TableCell>
                <TableCell>{orden.nombreCompletoOrden}</TableCell>
                <TableCell>{orden.direccionOrden}</TableCell>
                <TableCell>{orden.telefonoOrden}</TableCell>
                <TableCell>{orden.correoOrden}</TableCell>
                <TableCell>{orden.fecha_entrega}</TableCell>
                <TableCell>{orden.total_orden}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => verDetalles(orden)}>Ver Detalles</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal para ver detalles de la orden */}
      <Modal
        open={openModal}
        onClose={cerrarModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          {ordenSeleccionada && (
            <>
              <Typography id="modal-title" variant="h6" component="h2">
                Detalles de la Orden {ordenSeleccionada.idOrden}
              </Typography>
              <Typography id="modal-description" sx={{ mt: 2 }}>
                <strong>Nombre:</strong> {ordenSeleccionada.nombreCompletoOrden}<br />
                <strong>Dirección:</strong> {ordenSeleccionada.direccionOrden}<br />
                <strong>Teléfono:</strong> {ordenSeleccionada.telefonoOrden}<br />
                <strong>Correo:</strong> {ordenSeleccionada.correoOrden}<br />
                <strong>Fecha de Entrega:</strong> {ordenSeleccionada.fecha_entrega}<br />
                <strong>Total:</strong> {ordenSeleccionada.total_orden}<br />
                <h3>Productos:</h3>
                <ul>
                  {ordenSeleccionada.detalles.map((detalle) => (
                    <li key={detalle.Productos_idProductos}>
                      Producto: {detalle.Productos_idProductos.nombreProducto}<br />
                      Cantidad: {detalle.cantidadOD}<br />
                      Subtotal: {detalle.subtotalOD}
                    </li>
                  ))}
                </ul>
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => cancelarOrden(ordenSeleccionada.idOrden)}
              >
                Cancelar Orden
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </div>
    </Layout>
  );
};

export default OrdenesCliente;
