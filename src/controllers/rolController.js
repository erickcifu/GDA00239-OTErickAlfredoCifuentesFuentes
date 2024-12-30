const { sequelize } = require('../config/dbConfig');
const Rol = require('../models/rolModel.js');

const obtenerRol = async (req, res) => {
    const { idRol } = req.params; 
    try {
        const Rol = await sequelize.query(
            `EXEC ObtenerRolID @p_idRol=:idRol`,
            {
                replacements: { idRol: idRol || null },
                type: sequelize.QueryTypes.SELECT,
            }
        );

        if (!Rol || Rol.length === 0) {
            return res.status(404).json({ message: "No se encontraron rol" });
        }

        res.status(200).json(Rol);
    } catch (error) {
        console.error("Error al obtener rol:", error.message);
        res.status(500).json({ message: "Error al obtener Rol", error: error.message });
    }
};

const crearRol = async (req, res) => {
    try{
        const { nombreRol } = req.body;
        const [_, affectedRows] = await sequelize.query(
            `EXEC InsertarRol 
                @p_nombreRol=:nombreRol`,
            {
                replacements: {
                    nombreRol
                },
                type: sequelize.QueryTypes.INSERT
            }
        );
        res.status(201).json({
            message: "Rol creado correctamente",
            affectedRows,
        });
       }catch (error){
           console.error("Error al crear rol:", error.message);
           res.status(500).json({ message: "Error al crear rol", error: error.message });
       }
};

const ActualizarRol = async (req, res) => {
    const { idRol } = req.params;
    const { nombreRol } = req.body;
    try{
        const rolExistente = await sequelize.query(
            `EXEC ObtenerRolID @p_idRol=:idRol`,
            {
                replacements: { idRol },
                type: sequelize.QueryTypes.SELECT,
            }
        );
        if (!rolExistente || rolExistente.length === 0) {
            return res.status(404).json({ message: "Rol no encontrado" });
        }
        await sequelize.query(
            `EXEC ActualizarRol 
                @p_idRol=:idRol,
                @p_nombreRol=:nombreRol`,
            {
                replacements: {
                    idRol,
                    nombreRol,
                },
                type: sequelize.QueryTypes.UPDATE,
            }
        );

        res.status(200).json({ message: "Rol actualizado correctamente" });
    }catch (error) {
        console.error("Error al actualizar rol:", error.message);
        res.status(500).json({ message: "Error al actualizar rol", error: error.message });
    }
};
module.exports = { obtenerRol, crearRol, ActualizarRol};
