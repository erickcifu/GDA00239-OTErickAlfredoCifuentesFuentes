const { getProductos, createProducto, updateProducto,deactivateProducto } = require('../models/productoModel');

const obtenerProductos = async (req, res) => {
    const { idProducto } = req.params;

    try {
        const productos = await getProductos(idProducto ? parseInt(idProducto) : null);
        if (productos.length === 0) {
            return res.status(404).json({ message: "No se encontraron productos" });
        }
        res.status(200).json(productos);
    } catch (error) {
        console.error("Error al obtener productos:", error.message);
        res.status(500).json({ message: "Error al obtener productos", error: error.message });
    }
};

const crearProducto = async (req, res) => {
    const {CategoriaProductos_idCategoriaProducto, usuarios_idusuarios, nombreProducto, marcaProducto,descripcion,codigoProducto,stockProducto,precioProducto,fotoProducto,estados_idestado } = req.body;
    try {
        const producto = {CategoriaProductos_idCategoriaProducto, usuarios_idusuarios, nombreProducto, marcaProducto,descripcion,codigoProducto,stockProducto,precioProducto,fotoProducto,estados_idestado };
        await createProducto(producto);
         res.status(201).send("Producto creado");
     } catch (error) {
        console.error('Error al crear producto:', error.message, error.stack);
        res.status(500).json({ message: 'Error al insertar el producto', error: error.message });
    }
};
const actualizarProducto = async (req, res) => {
    const {idProducto ,CategoriaProductos_idCategoriaProducto, usuarios_idusuarios, nombreProducto, marcaProducto,descripcion,codigoProducto,stockProducto,precioProducto,fotoProducto,estados_idestado } = req.body;
    try {
        const producto = {idProducto,CategoriaProductos_idCategoriaProducto, usuarios_idusuarios, nombreProducto, marcaProducto,descripcion,codigoProducto,stockProducto,precioProducto,fotoProducto,estados_idestado };
        await updateProducto(producto);
         res.status(201).send("Producto Actualizado");
     } catch (error) {
        console.error('Error al Actualizar producto:', error.message, error.stack);
        res.status(500).json({ message: 'Error al insertar el producto', error: error.message });
    }
};

const desactivarProducto = async (req, res) => {
    const { idProducto } = req.params; 
    const { estados_idestado } = req.body; 
    try {
        const producto = { idProducto, estados_idestado }; 
        await deactivateProducto(producto); 
        res.status(200).send("Producto Inactivado");
    } catch (error) {
        console.error('Error al inactivar producto:', error.message, error.stack);
        res.status(500).json({ message: 'Error al inactivar el producto', error: error.message });
    }
};

module.exports = { obtenerProductos, crearProducto, actualizarProducto, desactivarProducto};
