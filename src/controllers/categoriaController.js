const { sequelize } = require('../config/dbConfig');
const CategoriaProductos = require('../models/categoriaModel.js');

const obtenerCategoria = async (req, res) => {
    const { idCategoriaProducto } = req.params;

    try {
        const CategoriaProductos = await sequelize.query(
            `EXEC ObtenerCatProdID @p_idCategoriaProducto=:idCategoriaProducto`,
            {
                replacements: { idCategoriaProducto: idCategoriaProducto || null },
                type: sequelize.QueryTypes.SELECT,
            }
        );        
        if (!CategoriaProductos || CategoriaProductos.length === 0) {
            return res.status(404).json({ message: "No se encontraron Categorias" });
        }
       
        res.status(200).json(CategoriaProductos);
    }catch (error) {
        console.error("Error al obtener Clientes:", error.message);
        res.status(500).json({ message: "Error al obtener Clientes", error: error.message });
    }
};

const crearCategoria = async (req, res) => {
    try{
        const {usuarios_idusuarios,nombreProducto,estados_idestado } = req.body;
        const [_, affectedRows] = await sequelize.query(
            `EXEC InsertarCategoriaProducto 
                @p_usuarios_idusuarios=:usuarios_idusuarios,
                @p_nombreProducto=:nombreProducto,
                @p_estados_idestado=:estados_idestado`,
            {
                replacements: {
                    usuarios_idusuarios,
                    nombreProducto,
                    estados_idestado
                },
                type: sequelize.QueryTypes.INSERT
            }
        );
        res.status(201).json({
            message: "Categoria creado correctamente",
            affectedRows,
        });
    }catch (error){
        console.error("Error al crear categoria:", error.message);
        res.status(500).json({ message: "Error al crear categoria", error: error.message });
    }
};

const ActualizarCategoria = async (req, res) => {
    const { idCategoriaProducto } = req.params;
    const {usuarios_idusuarios,nombreProducto,estados_idestado } = req.body;

    try{
        const categoriaExistente = await sequelize.query(
            `EXEC ObtenerCatProdID @p_idCategoriaProducto=:idCategoriaProducto`,
            {
                replacements: { idCategoriaProducto },
                type: sequelize.QueryTypes.SELECT,
            }
        );
        if (!categoriaExistente || categoriaExistente.length === 0) {
            return res.status(404).json({ message: "Categoria no encontrado" });
        }
        await sequelize.query(
            `EXEC ActualizarCategoriaProductos 
                @p_idCategoriaProducto=:idCategoriaProducto,
                @p_usuarios_idusuarios=:usuarios_idusuarios,
                @p_nombreProducto=:nombreProducto,
                @p_estados_idestado=:estados_idestado`,
            {
                replacements: {
                    idCategoriaProducto,
                    usuarios_idusuarios,
                    nombreProducto,
                    estados_idestado,
                },
                type: sequelize.QueryTypes.UPDATE,
            }
        );

        res.status(200).json({ message: "Categoria actualizado correctamente" });
    
    } catch (error) {
        console.error("Error al actualizar categoria:", error.message);
        res.status(500).json({ message: "Error al actualizar categoria", error: error.message });
    }
};

const desactivarCategoria = async (req, res) => {
    const { idCategoriaProducto } = req.params; 
    const { estados_idestado } = req.body; 

    try {
        const categoriaExistente = await sequelize.query(
            `EXEC ObtenerCatProdID @p_idCategoriaProducto=:idCategoriaProducto`,
            {
                replacements: { idCategoriaProducto },
                type: sequelize.QueryTypes.SELECT,
            }
        );

        if (!categoriaExistente || categoriaExistente.length === 0) {
            return res.status(404).json({ message: "Categoria no encontrado" });
        }

        await sequelize.query(
            `EXEC InactivarCategoriaProductos 
                @p_idCategoriaProducto=:idCategoriaProducto, 
                @p_estados_idestado=:estados_idestado`,
            {
                replacements: { idCategoriaProducto, estados_idestado },
                type: sequelize.QueryTypes.UPDATE,
            }
        );

        res.status(200).json({ 
            message: "Categoria inactivado correctamente", 
            idCategoriaProducto, 
            nuevoEstado: estados_idestado 
        });
    } catch (error) {
        console.error("Error al inactivar Categoria:", error.message);
        res.status(500).json({ 
            message: "Error al inactivar Categoria", 
            error: error.message 
        });
    }
};
module.exports = { obtenerCategoria, crearCategoria, ActualizarCategoria, desactivarCategoria};
