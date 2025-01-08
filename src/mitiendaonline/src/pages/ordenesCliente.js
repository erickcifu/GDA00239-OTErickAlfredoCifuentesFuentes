import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Modal, Box, Typography, Paper, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

import api, {obtenerUsuario} from '../config/axios';  // Suponiendo que tienes configurada una API para las solicitudes
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout';

const OrdenesCliente = () => {
  const { idUsuario } = useParams();
  const [ordenes, setOrdenes] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ordenSeleccionada, setOrdenSeleccionada] = useState(null);
  const navigate = useNavigate();

  // Obtener las órdenes del usuario logueado
 
    const fetchOrdenes = async () => {
      try {
        const idUsuario = obtenerUsuario();
        const response = await api.get(`/orden/ordenesUsuario/${idUsuario}`);  // Cambia la URL si es necesario
        setOrdenes(response.data);  
      } catch (error) {
        setError('Error al obtener las ordenes del usuario');
        console.error("Error al obtener las órdenes del usuario:", error);
      } finally {
        setLoading(false);
      }
    };

useEffect(() => {
      fetchOrdenes();
    }, [idUsuario]); 

    if (loading) return <p>Cargando órdenes...</p>;
    if (error) return <p>{error}</p>;

    const cancelarOrden = async (idOrden) => {
      try {
        await api.delete(`/orden/${idOrden}?estados_idestado=5`);
        fetchOrdenes(); 
      } catch (error) {
        console.error("Error al cancelar la orden:", error);
      }
    };

  const verDetalles = (orden) => {
    setOrdenSeleccionada(orden);
    setOpenModal(true);
  };

  const handleConfirmCancel = (orden) => {
    setOrdenSeleccionada(orden);
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const cerrarModal = () => {
    setOpenModal(false);
    setOrdenSeleccionada(null);
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
                <TableCell>Estado</TableCell>
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
                  <TableCell>{orden.nombre}</TableCell>
                  <TableCell>{orden.total_orden}</TableCell>
                  <TableCell>
                    {orden.nombre === "En espera" && (
                      <Button variant="outlined" color="error" onClick={() => handleConfirmCancel(orden)} style={{ marginRight: "1rem" }}>
                        Cancelar Orden
                      </Button>
                    )}
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
                </Typography>
              </>
            )}
          </Box>
        </Modal>

        <Dialog
          open={openConfirmDialog}
          onClose={handleCloseConfirmDialog}
        >
          <DialogTitle>Confirmación de Cancelación</DialogTitle>
          <DialogContent>
            <Typography>
              ¿Estás seguro de que deseas cancelar esta orden?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirmDialog} color="primary">
              No
            </Button>
            <Button 
              onClick={() => cancelarOrden(ordenSeleccionada.idOrden)} 
              color="secondary"
            >
              Sí, Cancelar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Layout>
  );
};


export default OrdenesCliente;
