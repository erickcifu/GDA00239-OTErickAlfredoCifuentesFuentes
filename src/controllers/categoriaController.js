const { getCategoria, createCategoria, updateCategoria, deactivateCategoria } = require('../models/categoriaModel');

const obtenerCategoria = async (req, res) => {
    const { idCategoriaProducto } = req.params; 
    try {
        const CategoriaProductos = await getCategoria(idCategoriaProducto ? parseInt(idCategoriaProducto) : null);
        if (CategoriaProductos.length === 0) {
            return res.status(404).json({ message: "No se encontraron categorias" });
        }
        console.log("categorias encontrados")
        res.status(200).json(CategoriaProductos);
    } catch (error) {
        console.error("Error al obtener cliente:", error.message);
        res.status(500).json({ message: "Error al obtener cliente", error: error.message });
    }
};

const crearCategoria = async (req, res) => {
    const {usuarios_idusuarios,nombreProducto,estados_idestado } = req.body;
    try {
        const CategoriaProductos = { usuarios_idusuarios, nombreProducto, estados_idestado };
        await createCategoria(CategoriaProductos);
         res.status(201).send("Categoria creado");
     } catch (error) {
        console.error('Error al crear Categoria:', error.message, error.stack);
        res.status(500).json({ message: 'Error al insertar el Categoria', error: error.message });
    }
};

const ActualizarCategoria = async (req, res) => {
    const {idCategoriaProducto,usuarios_idusuarios,nombreProducto,estados_idestado } = req.body;
    try {
        const CategoriaProductos = {idCategoriaProducto, usuarios_idusuarios,nombreProducto,estados_idestado };
        await updateCategoria(CategoriaProductos);
         res.status(201).send("Categoria Actualizado");
     } catch (error) {
        console.error('Error al Actualizar Categoria:', error.message, error.stack);
        res.status(500).json({ message: 'Error al insertar el categoria', error: error.message });
    }
};

const desactivarCategoria = async (req, res) => {
    const { idCategoriaProducto } = req.params; 
    const { estados_idestado } = req.body; 
    try {
        const CategoriaProductos = { idCategoriaProducto, estados_idestado }; 
        await deactivateCategoria(CategoriaProductos); 
        res.status(200).send("Categoria Inactivado");
    } catch (error) {
        console.error('Error al inactivar categoria:', error.message, error.stack);
        res.status(500).json({ message: 'Error al inactivar el Categoria', error: error.message });
    }
};
module.exports = { obtenerCategoria, crearCategoria, ActualizarCategoria, desactivarCategoria};
