const { sequelize } = require('../config/dbConfig');
const Orden = require('../models/ordenModel.js');
const OrdenDetalles = require('../models/ordDetModel.js');

const obtenerOrdenCompleta = async (req, res) => {
    const { idOrden } = req.params;

    try {
        const orden = await sequelize.query(
            `EXEC ObtenerOrdenCompletaID @idOrden=:idOrden`,
            {
                replacements: { idOrden: idOrden || null },
                type: sequelize.QueryTypes.SELECT,
            }
        );

        if (!orden || orden.length === 0) {
            return res.status(404).json({ message: "No se encontraron órdenes" });
        }

        if (idOrden) {
            const detalles = await sequelize.query(
                `SELECT od.Orden_idOrden, od.Productos_idProductos, od.cantidadOD, od.precioOD, od.subtotalOD
                 FROM OrdenDetalles od
                 WHERE od.Orden_idOrden = :idOrden`,
                {
                    replacements: { idOrden },
                    type: sequelize.QueryTypes.SELECT,
                }
            );
            return res.status(200).json({ orden: orden[0], detalles });
        }

        res.status(200).json(orden);
    } catch (error) {
        console.error("Error al obtener la orden completa:", error.message);
        res.status(500).json({ message: "Error al obtener la orden", error: error.message });
    }
};

const crearOrden = async (req, res) => {
    const { usuarios_idusuarios, nombreCompletoOrden, direccionOrden, telefonoOrden, correoOrden, fecha_entrega, detalles } = req.body;

    try {
        const detallesJson = JSON.stringify(detalles);

        const nuevaOrden = await sequelize.query(
            `EXEC InsertarOrdenCompleta 
                @usuarios_idusuarios=:usuarios_idusuarios,
                @nombreCompletoOrden=:nombreCompletoOrden,
                @direccionOrden=:direccionOrden,
                @telefonoOrden=:telefonoOrden,
                @correoOrden=:correoOrden,
                @fecha_entrega=:fecha_entrega,
                @detalles=:detalles`,
            {
                replacements: {
                    usuarios_idusuarios,
                    nombreCompletoOrden,
                    direccionOrden,
                    telefonoOrden,
                    correoOrden,
                    fecha_entrega,
                    detalles: detallesJson,
                },
                type: sequelize.QueryTypes.INSERT,
            }
        );

        res.status(201).json({ message: "Orden creada correctamente", nuevaOrden });
    } catch (error) {
        console.error("Error al crear la orden:", error.message);
        if (error.message.includes("Stock insuficiente")) {
            return res.status(409).json({ message: "Stock insuficiente para uno o más productos", error: error.message });
        }
        res.status(500).json({ message: "Error al crear la orden", error: error.message });
    }
};

const actualizarOrden = async (req, res) => {
    const { idOrden } = req.params;
    const { usuarios_idusuarios, nombreCompletoOrden, direccionOrden, telefonoOrden, correoOrden, fecha_entrega, detalles } = req.body;

    try {
        const detallesJson = JSON.stringify(detalles);

        const resultado = await sequelize.query(
            `EXEC ActualizarOrdenCompleta 
                @idOrden=:idOrden,
                @usuarios_idusuarios=:usuarios_idusuarios,
                @nombreCompletoOrden=:nombreCompletoOrden,
                @direccionOrden=:direccionOrden,
                @telefonoOrden=:telefonoOrden,
                @correoOrden=:correoOrden,
                @fecha_entrega=:fecha_entrega,
                @detalles=:detalles`,
            {
                replacements: {
                    idOrden,
                    usuarios_idusuarios,
                    nombreCompletoOrden,
                    direccionOrden,
                    telefonoOrden,
                    correoOrden,
                    fecha_entrega,
                    detalles: detallesJson,
                },
                type: sequelize.QueryTypes.UPDATE,
            }
        );

        res.status(200).json({ message: "Orden actualizada correctamente", resultado });
    } catch (error) {
        console.error("Error al actualizar la orden:", error.message);

        if (error.message.includes("Stock insuficiente")) {
            return res.status(409).json({ message: "Stock insuficiente para uno o más productos", error: error.message });
        }
        res.status(500).json({ message: "Error al actualizar la orden", error: error.message });
    }
};


const desactivarOrden = async (req, res) => {
    const { idOrden } = req.params;
    const { estados_idestado } = req.body;

    try {
        await sequelize.query(
            `EXEC InactivarOrden 
                @p_idOrden=:idOrden,
                @p_estados_idestado=:estados_idestado`,
            {
                replacements: { idOrden, estados_idestado },
                type: sequelize.QueryTypes.UPDATE,
            }
        );

        res.status(200).json({ message: "Orden desactivada correctamente" });
    } catch (error) {
        console.error("Error al desactivar la orden:", error.message);
        res.status(500).json({ message: "Error al desactivar la orden", error: error.message });
    }
};

module.exports = { obtenerOrdenCompleta, crearOrden, actualizarOrden, desactivarOrden, };
