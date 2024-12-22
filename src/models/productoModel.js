const { sql, connectDB } = require('../config/dbConfig');

const getProductos = async (idProducto = null) => {
    try {
        let query = "SELECT * FROM Productos";
        if (idProducto) {
            query += " WHERE idProducto = @idProducto";
        }

        const pool = await sql.connect(); 
        const result = await pool.request()
            .input("idProducto", sql.Int, idProducto)
            .query(query);

        if (!result || !result.recordset || result.recordset.length === 0) {
            console.log("No se encontraron productos.");
            return [];
        }

        console.log("Resultados de la consulta:", result.recordset);
        return result.recordset;
    } catch (error) {
        console.error("Error al ejecutar la consulta", error.message);
        throw error;
    }
};

const createProducto = async (producto) => {
    const {CategoriaProductos_idCategoriaProducto, usuarios_idusuarios, nombreProducto, marcaProducto,descripcion,codigoProducto,stockProducto,precioProducto,fotoProducto,estados_idestado } = producto;

    try {
        const result = await sql.query`
        EXEC InsertarProducto 
            @p_CategoriaProductos_idCategoriaProducto = ${CategoriaProductos_idCategoriaProducto}, 
            @p_usuarios_idusuarios = ${usuarios_idusuarios}, 
            @p_nombreProducto = ${nombreProducto},
            @p_marcaProducto = ${marcaProducto},
            @p_descripcion = ${descripcion},
            @p_codigoProducto = ${codigoProducto},
            @p_stockProducto = ${stockProducto},
            @p_precioProducto = ${precioProducto},
            @p_fotoProducto = NULL,
            @p_estados_idestado = ${estados_idestado};
    `;
        console.log('Producto insertado correctamente');
    } catch (error) {
        console.error("Error al insertar producto", error.message);
        throw error;
    }
};

const updateProducto = async (producto) => {
    const {idProducto, CategoriaProductos_idCategoriaProducto, usuarios_idusuarios, nombreProducto, marcaProducto,descripcion,codigoProducto,stockProducto,precioProducto,fotoProducto,estados_idestado } = producto;

    try {
        const result = await sql.query`
        EXEC  ActualizarProductos 
            @p_idProducto = ${idProducto},
            @p_CategoriaProductos_idCategoriaProducto = ${CategoriaProductos_idCategoriaProducto}, 
            @p_usuarios_idusuarios = ${usuarios_idusuarios}, 
            @p_nombreProducto = ${nombreProducto},
            @p_marcaProducto = ${marcaProducto},
            @p_descripcion = ${descripcion},
            @p_codigoProducto = ${codigoProducto},
            @p_stockProducto = ${stockProducto},
            @p_precioProducto = ${precioProducto},
            @p_fotoProducto = NULL,
            @p_estados_idestado = ${estados_idestado};
    `;
        console.log('Producto Actualizado correctamente');
    } catch (error) {
        console.error("Error al Actualizar producto", error.message);
        throw error;
    }
};

const deactivateProducto = async (producto) => {
    console.log("Datos para inactivar:", producto); 
    const { idProducto, estados_idestado } = producto;

    try {
        const result = await sql.query`
        EXEC InactivarProducto 
            @p_idProducto = ${idProducto},
            @p_estados_idestado = ${estados_idestado};
        `;
        console.log('Producto Desactivado correctamente:', result); 
    } catch (error) {
        console.error("Error al inactivar producto", error.message);
        throw error;
    }
};


module.exports = { getProductos, createProducto, updateProducto, deactivateProducto};
