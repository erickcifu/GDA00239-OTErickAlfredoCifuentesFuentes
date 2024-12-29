const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConfig');

const Producto = sequelize.define('Producto', {
    idProducto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    CategoriaProductos_idCategoriaProducto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'CategoriaProductos', 
            key: 'idCategoriaProducto',
        },
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
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    marcaProducto: {
        type: DataTypes.STRING(45),
    },
    descripcion: {
        type: DataTypes.STRING(300),
    },
    codigoProducto: {
        type: DataTypes.STRING(45),
        unique: true,
    },
    stockProducto: {
        type: DataTypes.FLOAT,
    },
    precioProducto: {
        type: DataTypes.FLOAT,
    },
    fotoProducto: {
        type: DataTypes.BLOB,
    },
    estados_idestado: {
        type: DataTypes.INTEGER,
        references: {
            model: 'estados',
            key: 'idestado',
        },
    },
}, {
    tableName: 'Productos',
    timestamps: false, 
});

module.exports = Producto;
