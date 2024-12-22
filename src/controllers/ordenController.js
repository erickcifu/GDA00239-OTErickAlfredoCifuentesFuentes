const { getOrdenCompleta, createOrden, updateOrden, deactivateOrden } = require('../models/ordenModel.js');

const obtenerOrdenCompleta = async (req, res) => {
  const { idOrden } = req.params;
  try {
    const result = await getOrdenCompleta(idOrden ? parseInt(idOrden) : null);

    if (result.length === 0 || (result.orden && !result.orden.idOrden)) {
      return res.status(404).json({ message: 'No se encontraron órdenes.' });
    }

    if (result.orden) {
      return res.status(200).json({
        message: 'Orden encontrada',
        orden: result.orden,
        detalles: result.detalles
      });
    }
    return res.status(200).json({
      message: 'Todas las órdenes',
      data: result
    });
  } catch (error) {
    console.error('Error al obtener la orden completa:', error.message);
    res.status(500).json({ message: 'Error al obtener la orden', error: error.message });
  }
};


const crearOrden = async (req, res) => {
    const { usuarios_idusuarios, nombreCompletoOrden, direccionOrden, telefonoOrden, correoOrden, fecha_entrega, detalles } = req.body;
    try {
        const orden = { usuarios_idusuarios, nombreCompletoOrden, direccionOrden, telefonoOrden, correoOrden, fecha_entrega, detalles };
        const resultado = await createOrden(orden);
        if (resultado && resultado.length > 0) {
            return res.status(201).json({
                message: "Orden creada exitosamente",
                data: resultado[0] 
            });
        } else {
            return res.status(500).json({ message: "Error al crear la orden" });
        }
    } catch (error) {
        console.error("Error al crear la orden:", error.message);
        res.status(500).json({ 
            message: "Error al insertar la orden", 
            error: error.message 
        });
    }
};

const actualizarOrden = async (req, res) => {
    const { idOrden } = req.params; 
    const { usuarios_idusuarios, nombreCompletoOrden, direccionOrden, telefonoOrden,correoOrden, fecha_entrega, detalles } = req.body; 
  
    try {
      const orden = { idOrden: parseInt(idOrden), usuarios_idusuarios, nombreCompletoOrden, direccionOrden, telefonoOrden, correoOrden, fecha_entrega, detalles };
  
const resultado = await updateOrden(orden);
  
      if (resultado && resultado.length > 0) {
        return res.status(200).json({
          message: "Orden actualizada exitosamente",
          data: resultado[0] 
        });
      } else {
        return res.status(404).json({ message: "Orden no encontrada o no actualizada" });
      }
    } catch (error) {
      console.error("Error al actualizar la orden:", error.message);
      res.status(500).json({ 
        message: "Error al actualizar la orden", 
        error: error.message 
      });
    }
  };

  const desactivarOrden = async (req, res) => {
    const { idOrden } = req.params; 
    const { estados_idestado } = req.body; 
    try {
        const Orden = { idOrden, estados_idestado }; 
        await deactivateOrden(Orden); 
        res.status(200).send("Orden Inactivado");
    } catch (error) {
        console.error('Error al inactivar Orden:', error.message, error.stack);
        res.status(500).json({ message: 'Error al inactivar el Orden', error: error.message });
    }
};

module.exports = { obtenerOrdenCompleta, crearOrden, actualizarOrden, desactivarOrden };
