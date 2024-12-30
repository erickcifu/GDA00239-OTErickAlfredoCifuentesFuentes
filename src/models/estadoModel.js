const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConfig');

const estados = sequelize.define('estados',{
    idestado: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre:{
        type: DataTypes.STRING(45)
    }
},{
    tableName: 'estados',
})