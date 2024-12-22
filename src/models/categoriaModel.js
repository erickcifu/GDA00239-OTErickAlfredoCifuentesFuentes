const { sql, connectDB } = require('../config/dbConfig');

const getCategoria = async (idCategoriaProducto = null) => {
    try {
        const pool = await sql.connect();
        const request = pool.request();
        if (idCategoriaProducto) {
            request.input("p_idCategoriaProducto", sql.Int, idCategoriaProducto);
        }
        const result = await request.execute("ObtenerCatProdID"); 
        if (!result || !result.recordset || result.recordset.length === 0) {
            console.log("No se encontraron categorias.");
            return [];
        }
        console.log("Resultados de la consulta:", result.recordset);
        return result.recordset;
    } catch (error) {
        console.error("Error al ejecutar el procedimiento almacenado", error.message);
        throw error;
    }
};

const createCategoria = async (CategoriaProductos) => {
    const {usuarios_idusuarios,nombreProducto,estados_idestado } = CategoriaProductos;

    try {
        const result = await sql.query`
        EXEC InsertarCategoriaProducto 
            @p_usuarios_idusuarios = ${usuarios_idusuarios}, 
            @p_nombreProducto = ${nombreProducto}, 
            @p_estados_idestado = ${estados_idestado};
    `;
        console.log('Categoria insertado correctamente');
    } catch (error) {
        console.error("Error al insertar categoria", error.message);
        throw error;
    }
};
const updateCategoria = async (CategoriaProductos) => {
    const {idCategoriaProducto, usuarios_idusuarios,nombreProducto,estados_idestado } = CategoriaProductos;

    try {
        const result = await sql.query`
        EXEC  ActualizarCategoriaProductos 
            @p_idCategoriaProducto = ${idCategoriaProducto},
            @p_usuarios_idusuarios = ${usuarios_idusuarios}, 
            @p_nombreProducto = ${nombreProducto}, 
            @p_estados_idestado = ${estados_idestado};
    `;
        console.log('Categoria Actualizado correctamente');
    } catch (error) {
        console.error("Error al Actualizar categoria", error.message);
        throw error;
    }
};

const deactivateCategoria = async (CategoriaProductos) => {
    console.log("Datos para inactivar:", CategoriaProductos);
    const { idCategoriaProducto, estados_idestado } = CategoriaProductos;

    try {
        const result = await sql.query`
        EXEC InactivarCategoriaProductos 
            @p_idCategoriaProducto = ${idCategoriaProducto},
            @p_estados_idestado = ${estados_idestado};
        `;
        console.log('Categoria Desactivado correctamente:', result); 
    } catch (error) {
        console.error("Error al inactivar categoria", error.message);
        throw error;
    }
};

module.exports = { getCategoria, createCategoria, updateCategoria, deactivateCategoria};
