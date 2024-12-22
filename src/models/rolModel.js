const { sql, connectDB } = require('../config/dbConfig');

const getRol = async (idRol = null) => {
    try {
        const pool = await sql.connect();
        const request = pool.request();
        if (idRol) {
            request.input("p_idRol", sql.Int, idRol);
        }
        const result = await request.execute("ObtenerRolID"); 
        if (!result || !result.recordset || result.recordset.length === 0) {
            console.log("No se encontraron Rol.");
            return [];
        }
        console.log("Resultados de la rol:", result.recordset);
        return result.recordset;
    } catch (error) {
        console.error("Error al ejecutar el procedimiento almacenado", error.message);
        throw error;
    }
};

const createRol = async (Rol) => {
    const {nombreRol } = Rol;
    try {
        const result = await sql.query`
        EXEC InsertarRol 
            @p_nombreRol = ${nombreRol}; 
    `;
        console.log('rol insertado correctamente');
    } catch (error) {
        console.error("Error al insertar rol", error.message);
        throw error;
    }
};

const updateRol = async (Rol) => {
    const { idRol, nombreRol } = Rol;
    try {
        const result = await sql.query`
        EXEC  ActualizarRol 
            @p_idRol = ${idRol},
            @p_nombreRol = ${nombreRol}; 
    `;
        console.log('Rol Actualizado correctamente');
    } catch (error) {
        console.error("Error al Actualizar rol", error.message);
        throw error;
    }
};
module.exports = { getRol, createRol, updateRol};
