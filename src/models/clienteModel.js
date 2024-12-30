const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConfig');

const Clientes = sequelize.define('Clientes',{
    idCliente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
    },
    razon_social: {
        type: DataTypes.STRING(245),
        allowNull:  false,
    },
    nombreComercial: {
        type: DataTypes.STRING(345),
        allowNull:  false
    },
    Nit: {
        type: DataTypes.STRING(10),
        allowNull:  false,
    },
    direccionEntrega: {
        type: DataTypes.STRING(45),
        allowNull:  false,
    },
    telefonoCliente: {
        type: DataTypes.STRING(45),
    },
    emailCliente: {
        type: DataTypes.STRING(45),
    },
},{
    tableName: 'Clientes',
});

module.exports = Clientes;