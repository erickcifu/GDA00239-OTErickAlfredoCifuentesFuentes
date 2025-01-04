const { DataTypes, QueryTypes } = require('sequelize');
const { sequelize } = require('../config/dbConfig');
const bcrypt = require('bcryptjs');

const Usuario = sequelize.define('Usuario', {
    idUsuarios: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rol_idrol: { type: DataTypes.INTEGER },
    estados_idestado: { type: DataTypes.INTEGER },
    correoUsuaro: { type: DataTypes.STRING(45), allowNull: false },
    nombreCompletoUsuario: { type: DataTypes.STRING(100), allowNull: false },
    passwordUsuario: { type: DataTypes.STRING(255), allowNull: false },
    telefonoUsuario: { type: DataTypes.STRING(45) },
    fechaNacimientoUsuario: { type: DataTypes.DATE },
    fechaCreacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    Clientes_idClientes: { type: DataTypes.INTEGER },
}, {
    timestamps: false,
    tableName: 'Usuarios',
});

// Métodos personalizados
Usuario.getUsuarioPorId = async function (idUsuarios = null) {
    const result = await sequelize.query(
        `EXEC ObtenerUsuariosID :idUsuarios`,
        {
            replacements: { idUsuarios },
            type: QueryTypes.SELECT,
        }
    );
    return result;
    
};

Usuario.obtenerUsuarioPorEmail = async function (correoUsuaro) {
    const result = await sequelize.query(
        `SELECT * FROM Usuarios WHERE correoUsuaro = :correoUsuaro`,
        {
            replacements: { correoUsuaro },
            type: QueryTypes.SELECT,
        }
    );
    return result[0];
};

Usuario.crearUsuario = async function (usuarioData) {
    const {
        rol_idrol,
        estados_idestado,
        correoUsuaro,
        nombreCompletoUsuario,
        passwordUsuario,
        telefonoUsuario,
        fechaNacimientoUsuario,
        Clientes_idClientes,
    } = usuarioData;

    const passwordHash = await bcrypt.hash(passwordUsuario, 10);

    await sequelize.query(
        `EXEC InsertarUsuario 
            @p_rol_idrol = :rol_idrol,
            @p_estados_idestado = :estados_idestado,
            @p_correoUsuario = :correoUsuaro,
            @p_nombreCompletoUsuario = :nombreCompletoUsuario,
            @p_passwordUsuario = :passwordUsuario,
            @p_telefonoUsuario = :telefonoUsuario,
            @p_fechaNacimientoUsuario = :fechaNacimientoUsuario,
            @p_Clientes_idClientes = :Clientes_idClientes`,
        {
            replacements: {
                rol_idrol,
                estados_idestado,
                correoUsuaro,
                nombreCompletoUsuario,
                passwordUsuario: passwordHash,
                telefonoUsuario,
                fechaNacimientoUsuario,
                Clientes_idClientes,
            },
        }
    );
};

Usuario.updateUsuario = async function (usuarioData) {
    const { passwordUsuario } = usuarioData;
    if (passwordUsuario) {
        usuarioData.passwordUsuario = await bcrypt.hash(passwordUsuario, 10);
    }
    
    await sequelize.query(
        `EXEC ActualizarUsuarios 
            @p_idUsuarios = :idUsuarios,
            @p_rol_idrol = :rol_idrol,
            @p_estados_idestado = :estados_idestado,
            @p_correoUsuario = :correoUsuaro,
            @p_nombreCompletoUsuario = :nombreCompletoUsuario,
            @p_passwordUsuario = :passwordUsuario,
            @p_telefonoUsuario = :telefonoUsuario,
            @p_fechaNacimientoUsuario = :fechaNacimientoUsuario,
            @p_Clientes_idClientes = :Clientes_idClientes`,
        {
            replacements: usuarioData,
        }
    );
};

Usuario.deactivateUsuario = async function (idUsuarios, estados_idestado) {
    await sequelize.query(
        `EXEC InactivarUsuario 
            @p_idUsuarios = :idUsuarios,
            @p_estados_idestado = :estados_idestado`,
        {
            replacements: { idUsuarios, estados_idestado },
        }
    );
};

module.exports = Usuario;
