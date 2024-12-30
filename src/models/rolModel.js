const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConfig');

const Rol = sequelize.define('Rol',{
    idestado: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombreRol: {
        type: DataTypes.STRING(45)
    }
},{
    tableName: 'Rol',
})
module.exports = Rol;