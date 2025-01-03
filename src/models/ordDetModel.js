const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConfig');

const Orden = require('./ordenModel.js');

const OrdenDetalles = sequelize.define('OrdenDetalles', {
    idOrdenDetalle: { 
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true 
    },
    Orden_idOrden: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Orden',
          key: 'idOrden'
        },
      },
    Productos_idProductos: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    cantidadOD: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    precioOD: { 
        type: DataTypes.FLOAT, 
        allowNull: false 
    },
    subtotalOD: { 
        type: DataTypes.FLOAT, 
        allowNull: false 
    },
}, {
    tableName: 'OrdenDetalles',
    timestamps: false,
});

module.exports = OrdenDetalles;