const { sql, connectDB } = require('../config/dbConfig');

const getEstado = async (idestado = null) => {
    try {
        const pool = await sql.connect();
        const request = pool.request();
        if (idestado) {
            request.input("p_idestado", sql.Int, idestado);
        }
        const result = await request.execute("ObtenerEstadosID"); 
        if (!result || !result.recordset || result.recordset.length === 0) {
            console.log("No se encontraron Estado.");
            return [];
        }
        console.log("Resultados de la estado:", result.recordset);
        return result.recordset;
    } catch (error) {
        console.error("Error al ejecutar el procedimiento almacenado", error.message);
        throw error;
    }
};

const createEstado = async (estados) => {
    const { nombre } = estados;
    try {
        const result = await sql.query`
        EXEC Insertarestados 
            @p_nombre = ${nombre}; 
    `;
        console.log('Estado insertado correctamente');
    } catch (error) {
        console.error("Error al insertar estado", error.message);
        throw error;
    }
};

const updateEstado = async (estados) => {
    const { idestado, nombre } = estados;
    try {
        const result = await sql.query`
        EXEC  ActualizarEstados 
            @p_idestado = ${idestado},
            @p_nombre = ${nombre}; 
    `;
        console.log('Estado Actualizado correctamente');
    } catch (error) {
        console.error("Error al Actualizar estado", error.message);
        throw error;
    }
};


module.exports = { getEstado, createEstado, updateEstado};
