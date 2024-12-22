const { sql, connectDB } = require('../config/dbConfig');

const getOrdenCompleta = async (idOrden = null) => {
  try {
    const pool = await sql.connect();
    const request = pool.request();

    if (idOrden) {
      request.input('idOrden', sql.Int, idOrden);
    }

    const result = await request.execute('ObtenerOrdenCompletaID');

    if (!result || !result.recordset || result.recordset.length === 0) {
      console.log('No se encontraron órdenes.');
      return []; 
    }

    console.log('Resultados de la consulta:', result.recordset);

    if (idOrden) {
      const detalles = await request.query(`
        SELECT od.Orden_idOrden,
               od.Productos_idProductos,
               od.cantidadOD,
               od.precioOD,
               od.subtotalOD
        FROM OrdenDetalles od
        WHERE od.Orden_idOrden = ${idOrden};
      `);
      return {
        orden: result.recordset[0], 
        detalles: detalles.recordset 
      };
    }
    return result.recordset;

  } catch (error) {
    console.error('Error al obtener la orden:', error.message);
    throw error;
  }
};

const createOrden = async (orden) => {
  const { usuarios_idusuarios, nombreCompletoOrden, direccionOrden, telefonoOrden, correoOrden, fecha_entrega, detalles } = orden;
  try {
      const detallesJson = JSON.stringify(detalles);
      const result = await sql.query`
          EXEC InsertarOrdenCompleta 
              @usuarios_idusuarios = ${usuarios_idusuarios},
              @nombreCompletoOrden = ${nombreCompletoOrden},
              @direccionOrden = ${direccionOrden},
              @telefonoOrden = ${telefonoOrden},
              @correoOrden = ${correoOrden},
              @fecha_entrega = ${fecha_entrega},
              @detalles = ${detallesJson};
      `;
      console.log('Orden insertada correctamente');
      return result.recordset; 
  } catch (error) {
      console.error("Error al insertar la orden", error.message);
      throw error;
  }
};

const updateOrden = async (orden) => {
  const { idOrden, usuarios_idusuarios, nombreCompletoOrden, direccionOrden, telefonoOrden, correoOrden, fecha_entrega, detalles } = orden;

  try {
    const detallesJson = JSON.stringify(detalles);

    const result = await sql.query`
      EXEC ActualizarOrdenCompleta
        @idOrden = ${idOrden},
        @usuarios_idusuarios = ${usuarios_idusuarios},
        @nombreCompletoOrden = ${nombreCompletoOrden},
        @direccionOrden = ${direccionOrden},
        @telefonoOrden = ${telefonoOrden},
        @correoOrden = ${correoOrden},
        @fecha_entrega = ${fecha_entrega},
        @detalles = ${detallesJson};
    `;
    console.log('Orden actualizada correctamente');
    return result.recordset;
  } catch (error) {
    console.error("Error al actualizar la orden", error.message);
    throw error;
  }
};

const deactivateOrden = async (Orden) => {
  console.log("Datos para inactivar:", Orden); 
  const { idOrden, estados_idestado } = Orden;

  try {
      const result = await sql.query`
      EXEC InactivarOrden 
          @p_idOrden = ${idOrden},
          @p_estados_idestado = ${estados_idestado};
      `;
      console.log('Orden Desactivado correctamente:', result); 
  } catch (error) {
      console.error("Error al inactivar Orden", error.message);
      throw error;
  }
};

module.exports = { getOrdenCompleta, createOrden, updateOrden, deactivateOrden };
