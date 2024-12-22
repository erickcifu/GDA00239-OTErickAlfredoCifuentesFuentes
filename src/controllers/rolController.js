const { getRol, createRol, updateRol} = require('../models/rolModel');

const obtenerRol = async (req, res) => {
    const { idRol } = req.params; 
    try {
        const Rol = await getRol(idRol ? parseInt(idRol) : null);
        if (Rol.length === 0) {
            return res.status(404).json({ message: "No se encontraron rol" });
        }
        console.log("Rol encontrados")
        res.status(200).json(Rol);
    } catch (error) {
        console.error("Error al obtener rol:", error.message);
        res.status(500).json({ message: "Error al obtener rol", error: error.message });
    }
};

const crearRol = async (req, res) => {
    const {nombreRol } = req.body;
    try {
        const Rol = { nombreRol };
        await createRol(Rol);
         res.status(201).send("Rol creado");
     } catch (error) {
        console.error('Error al crear Rol:', error.message, error.stack);
        res.status(500).json({ message: 'Error al insertar el Rol', error: error.message });
    }
};

const ActualizarRol = async (req, res) => {
    const { idRol, nombreRol } = req.body;
    try {
        const Rol = { idRol, nombreRol };
        await updateRol(Rol);
         res.status(201).send("Rol Actualizado");
     } catch (error) {
        console.error('Error al Actualizar Rol:', error.message, error.stack);
        res.status(500).json({ message: 'Error al insertar el rol', error: error.message });
    }
};
module.exports = { obtenerRol, crearRol, ActualizarRol};
