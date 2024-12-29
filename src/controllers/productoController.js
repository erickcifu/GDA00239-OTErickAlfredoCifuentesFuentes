const { sequelize } = require('../config/dbConfig');
const Producto = require('../models/productoModel.js');

const obtenerProductos = async (req, res) => {
    const { idProducto } = req.params;

    try {
        const productos = await sequelize.query(
            `EXEC ObtenerProductosID @p_idProducto=:idProducto`,
            {
                replacements: { idProducto: idProducto || null },
                type: sequelize.QueryTypes.SELECT,
            }
        );

        if (!productos || productos.length === 0) {
            return res.status(404).json({ message: "No se encontraron productos" });
        }

        res.status(200).json(productos);
    } catch (error) {
        console.error("Error al obtener productos:", error.message);
        res.status(500).json({ message: "Error al obtener productos", error: error.message });
    }
};

const crearProducto = async (req, res) => {
    try {
        const { CategoriaProductos_idCategoriaProducto, usuarios_idusuarios, nombreProducto, marcaProducto, descripcion, codigoProducto, stockProducto, precioProducto, fotoProducto, estados_idestado } = req.body;

        const fotoProductoBinario = fotoProducto
        ? Buffer.from(fotoProducto, 'base64') 
        : null;

        const [_, affectedRows] = await sequelize.query(
            `EXEC InsertarProducto 
                @p_CategoriaProductos_idCategoriaProducto=:CategoriaProductos_idCategoriaProducto,
                @p_usuarios_idusuarios=:usuarios_idusuarios,
                @p_nombreProducto=:nombreProducto,
                @p_marcaProducto=:marcaProducto,
                @p_descripcion=:descripcion,
                @p_codigoProducto=:codigoProducto,
                @p_stockProducto=:stockProducto,
                @p_precioProducto=:precioProducto,
                @p_fotoProducto=:fotoProducto,
                @p_estados_idestado=:estados_idestado`,
            {
                replacements: {
                    CategoriaProductos_idCategoriaProducto,
                    usuarios_idusuarios,
                    nombreProducto,
                    marcaProducto,
                    descripcion,
                    codigoProducto,
                    stockProducto,
                    precioProducto,
                    fotoProducto: fotoProductoBinario,
                    estados_idestado
                },
                type: sequelize.QueryTypes.INSERT
            }
        );

        res.status(201).json({
            message: "Producto creado correctamente",
            affectedRows,
        });
    } catch (error) {
        console.error("Error al crear producto:", error.message);
        res.status(500).json({ message: "Error al crear producto", error: error.message });
    }
};
const actualizarProducto = async (req, res) => {
    const { idProducto } = req.params;
    const { CategoriaProductos_idCategoriaProducto, usuarios_idusuarios, nombreProducto, marcaProducto, descripcion, codigoProducto, stockProducto, precioProducto, fotoProducto, estados_idestado } = req.body;

    try {
        const productoExistente = await sequelize.query(
            `EXEC ObtenerProductosID @p_idProducto=:idProducto`,
            {
                replacements: { idProducto },
                type: sequelize.QueryTypes.SELECT,
            }
        );

        if (!productoExistente || productoExistente.length === 0) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        await sequelize.query(
            `EXEC ActualizarProductos 
                @p_idProducto=:idProducto,
                @p_CategoriaProductos_idCategoriaProducto=:CategoriaProductos_idCategoriaProducto,
                @p_usuarios_idusuarios=:usuarios_idusuarios,
                @p_nombreProducto=:nombreProducto,
                @p_marcaProducto=:marcaProducto,
                @p_descripcion=:descripcion,
                @p_codigoProducto=:codigoProducto,
                @p_stockProducto=:stockProducto,
                @p_precioProducto=:precioProducto,
                @p_fotoProducto=:fotoProducto,
                @p_estados_idestado=:estados_idestado`,
            {
                replacements: {
                    idProducto,
                    CategoriaProductos_idCategoriaProducto,
                    usuarios_idusuarios,
                    nombreProducto,
                    marcaProducto,
                    descripcion,
                    codigoProducto,
                    stockProducto,
                    precioProducto,
                    fotoProducto,
                    estados_idestado,
                },
                type: sequelize.QueryTypes.UPDATE,
            }
        );

        res.status(200).json({ message: "Producto actualizado correctamente" });
    } catch (error) {
        console.error("Error al actualizar producto:", error.message);
        res.status(500).json({ message: "Error al actualizar producto", error: error.message });
    }
};

const desactivarProducto = async (req, res) => {
    const { idProducto } = req.params; 
    const { estados_idestado } = req.body; 

    try {
        const productoExistente = await sequelize.query(
            `EXEC ObtenerProductosID @p_idProducto=:idProducto`,
            {
                replacements: { idProducto },
                type: sequelize.QueryTypes.SELECT,
            }
        );

        if (!productoExistente || productoExistente.length === 0) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        await sequelize.query(
            `EXEC InactivarProducto 
                @p_idProducto=:idProducto, 
                @p_estados_idestado=:estados_idestado`,
            {
                replacements: { idProducto, estados_idestado },
                type: sequelize.QueryTypes.UPDATE,
            }
        );

        res.status(200).json({ 
            message: "Producto inactivado correctamente", 
            idProducto, 
            nuevoEstado: estados_idestado 
        });
    } catch (error) {
        console.error("Error al inactivar producto:", error.message);
        res.status(500).json({ 
            message: "Error al inactivar producto", 
            error: error.message 
        });
    }
};
module.exports = { obtenerProductos, crearProducto, actualizarProducto, desactivarProducto };
