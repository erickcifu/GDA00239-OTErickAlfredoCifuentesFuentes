const { sequelize } = require('../config/dbConfig');
const estados = require('../models/estadoModel.js');

const obtenerEstado = async (req, res) => {
    const { idestado } = req.params; 
    try {
        const estados = await sequelize.query(
            `EXEC ObtenerEstadosID @p_idestado=:idestado`,
            {
                replacements: { idestado: idestado || null },
                type: sequelize.QueryTypes.SELECT,
            }
        );

        if (!estados || estados.length === 0) {
            return res.status(404).json({ message: "No se encontraron estados" });
        }

        res.status(200).json(estados);
    } catch (error) {
        console.error("Error al obtener estados:", error.message);
        res.status(500).json({ message: "Error al obtener estados", error: error.message });
    }
};

const crearEstado = async (req, res) => {
    try{
        const { nombre } = req.body;
        const [_, affectedRows] = await sequelize.query(
            `EXEC Insertarestados 
                @p_nombre=:nombre`,
            {
                replacements: {
                    nombre
                },
                type: sequelize.QueryTypes.INSERT
            }
        );
        res.status(201).json({
            message: "Estado creado correctamente",
            affectedRows,
        });
       }catch (error){
           console.error("Error al crear Estado:", error.message);
           res.status(500).json({ message: "Error al crear Estado", error: error.message });
       }
};


const ActualizarEstado = async (req, res) => {
    const { idestado } = req.params;
    const { nombre } = req.body;
    try{
        const estadoExistente = await sequelize.query(
            `EXEC ObtenerEstadosID @p_idestado=:idestado`,
            {
                replacements: { idestado },
                type: sequelize.QueryTypes.SELECT,
            }
        );
        if (!estadoExistente || estadoExistente.length === 0) {
            return res.status(404).json({ message: "Estado no encontrado" });
        }
        await sequelize.query(
            `EXEC ActualizarEstados 
                @p_idestado=:idestado,
                @p_nombre=:nombre`,
            {
                replacements: {
                    idestado,
                    nombre,
                },
                type: sequelize.QueryTypes.UPDATE,
            }
        );

        res.status(200).json({ message: "Estado actualizado correctamente" });
    }catch (error) {
        console.error("Error al actualizar Estado:", error.message);
        res.status(500).json({ message: "Error al actualizar Estado", error: error.message });
    }
};
module.exports = { obtenerEstado, crearEstado, ActualizarEstado };
