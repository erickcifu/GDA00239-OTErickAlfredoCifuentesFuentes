const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConfig');

const CategoriaProductos = sequelize.define('CategoriaProductos', {
    idCategoriaProducto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    usuarios_idusuarios: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Usuarios',
            key: 'idUsuarios',
        },
    },
    nombreProducto: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    estados_idestado: {
        type: DataTypes.INTEGER,
        references: {
            model: 'estados',
            key: 'idestado',
        },
    },
},{
    tableName: 'CategoriaProductos',
    timestamps: false, 
})
module.exports = CategoriaProductos;
