const bcrypt = require("bcryptjs");
const { sql } = require('../config/dbConfig');

const getUsuarioPorId = async (idUsuarios = null) => {
  try {
      const pool = await sql.connect();
      const request = pool.request();
      if (idUsuarios) {
          request.input("p_idUsuarios", sql.Int, idUsuarios);
      }
      const result = await request.execute("ObtenerUsuariosID"); 
      if (!result || !result.recordset || result.recordset.length === 0) {
          console.log("No se encontraron Usuarios.");
          return [];
      }
      console.log("Resultados de la consulta:", result.recordset);
      return result.recordset;
  } catch (error) {
      console.error("Error al ejecutar el procedimiento almacenado", error.message);
      throw error;
  }
};

const obtenerUsuarioPorEmail = async (correoUsuaro) => {
  const result = await sql.query`SELECT * FROM Usuarios WHERE correoUsuaro = ${correoUsuaro}`;
  return result.recordset[0];
};

const crearUsuario = async (Usuarios) => {
  const { rol_idrol, estados_idestado, correoUsuaro, nombreCompletoUsuario, passwordUsuario, telefonoUsuario, fechaNacimientoUsuario, Clientes_idClientes} = Usuarios;

  //bcrypt
  const contraseniaEncriptada = await bcrypt.hash(passwordUsuario, 10);

  await sql.query`
    EXEC InsertarUsuario 
        @p_rol_idRol = ${rol_idrol},
        @p_estados_idestado = ${estados_idestado},
        @p_correoUsuario = ${correoUsuaro},
        @p_nombreCompletoUsuario = ${nombreCompletoUsuario},
        @p_passwordUsuario = ${passwordUsuario},
        @p_telefonoUsuario = ${telefonoUsuario},
        @p_fechaNacimientoUsuario = ${fechaNacimientoUsuario},
        @p_Clientes_idClientes = ${Clientes_idClientes};
  `;
};

const updateUsuario = async (Usuarios) => {
    const {idUsuarios, rol_idrol, estados_idestado, correoUsuaro, nombreCompletoUsuario, passwordUsuario, telefonoUsuario, fechaNacimientoUsuario, Clientes_idClientes } = Usuarios;

    try {
        const result = await sql.query`
        EXEC  ActualizarUsuarios 
            @p_idUsuarios = ${idUsuarios},
            @p_rol_idRol = ${rol_idrol},
            @p_estados_idestado = ${estados_idestado},
            @p_correoUsuario = ${correoUsuaro},
            @p_nombreCompletoUsuario = ${nombreCompletoUsuario},
            @p_passwordUsuario = ${passwordUsuario},
            @p_telefonoUsuario = ${telefonoUsuario},
            @p_fechaNacimientoUsuario = ${fechaNacimientoUsuario},
            @p_Clientes_idClientes = ${Clientes_idClientes};
    `;
        console.log('Usuario Actualizado correctamente');
    } catch (error) {
        console.error("Error al Actualizar Usuario", error.message);
        throw error;
    }
};

const deactivateUsuario = async (Usuarios) => {
    console.log("Datos para inactivar:", Usuarios);
    const { idUsuarios, estados_idestado } = Usuarios;

    try {
        const result = await sql.query`
        EXEC InactivarUsuario 
            @p_idUsuarios = ${idUsuarios},
            @p_estados_idestado = ${estados_idestado};
        `;
        console.log('Usuario Desactivado correctamente:', result); 
    } catch (error) {
        console.error("Error al inactivar Usuario", error.message);
        throw error;
    }
};

module.exports = { getUsuarioPorId, obtenerUsuarioPorEmail, crearUsuario,updateUsuario, deactivateUsuario };