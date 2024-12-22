const { getEstado, createEstado, updateEstado} = require('../models/estadoModel');

const obtenerEstado = async (req, res) => {
    const { idestado } = req.params; 
    try {
        const estados = await getEstado(idestado ? parseInt(idestado) : null);
        if (estados.length === 0) {
            return res.status(404).json({ message: "No se encontraron estado" });
        }
        console.log("Estados encontrados")
        res.status(200).json(estados);
    } catch (error) {
        console.error("Error al obtener estado:", error.message);
        res.status(500).json({ message: "Error al obtener estado", error: error.message });
    }
};

const crearEstado = async (req, res) => {
    const { nombre } = req.body;
    try {
        const estados = { nombre};
        await createEstado(estados);
         res.status(201).send("estado creado");
     } catch (error) {
        console.error('Error al crear estado:', error.message, error.stack);
        res.status(500).json({ message: 'Error al insertar el estado', error: error.message });
    }
};

const ActualizarEstado = async (req, res) => {
    const { idestado, nombre } = req.body;
    try {
        const estados = { idestado, nombre };
        await updateEstado(estados);
         res.status(201).send("Estado Actualizado");
     } catch (error) {
        console.error('Error al Actualizar Estado:', error.message, error.stack);
        res.status(500).json({ message: 'Error al insertar el estado', error: error.message });
    }
};
module.exports = { obtenerEstado, crearEstado, ActualizarEstado };
