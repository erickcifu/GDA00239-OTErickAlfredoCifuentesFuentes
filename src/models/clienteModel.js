const { sql, connectDB } = require('../config/dbConfig');

const getCliente = async (idCliente = null) => {
    try {
        const pool = await sql.connect();
        const request = pool.request();
        if (idCliente) {
            request.input("p_idCliente", sql.Int, idCliente);
        }
        const result = await request.execute("ObtenerClientesID"); 
        if (!result || !result.recordset || result.recordset.length === 0) {
            console.log("No se encontraron clientes.");
            return [];
        }
        console.log("Resultados de la consulta:", result.recordset);
        return result.recordset;
    } catch (error) {
        console.error("Error al ejecutar el procedimiento almacenado", error.message);
        throw error;
    }
};

const createCliente = async (clientes) => {
    const {razon_social,nombreComercial,Nit,direccionEntrega,telefonoCliente,emailCliente } = clientes;

    try {
        const result = await sql.query`
        EXEC Insertarcliente 
            @p_razon_social = ${razon_social}, 
            @p_nombreComercial = ${nombreComercial}, 
            @p_Nit = ${Nit},
            @p_direccionEntrega = ${direccionEntrega},
            @p_telefonoCliente = ${telefonoCliente},
            @p_emailCliente = ${emailCliente};
    `;
        console.log('Cliente insertado correctamente');
    } catch (error) {
        console.error("Error al insertar clientea", error.message);
        throw error;
    }
};

const updateClientes = async (clientes) => {
    const {idCliente, razon_social, nombreComercial, Nit, direccionEntrega,telefonoCliente,emailCliente } = clientes;

    try {
        const result = await sql.query`
        EXEC  ActualizarCliente 
            @p_idCliente = ${idCliente},
            @p_razon_social = ${razon_social}, 
            @p_nombreComercial = ${nombreComercial}, 
            @p_Nit = ${Nit},
            @p_direccionEntrega = ${direccionEntrega},
            @p_telefonoCliente = ${telefonoCliente},
            @p_emailCliente = ${emailCliente};
    `;
        console.log('Cliente Actualizado correctamente');
    } catch (error) {
        console.error("Error al Actualizar cliente", error.message);
        throw error;
    }
};
module.exports = { getCliente, createCliente, updateClientes};
