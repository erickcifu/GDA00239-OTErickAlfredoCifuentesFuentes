const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConfig');

const Orden =sequelize.define('Orden',{
  idOrden:{
    type: DataTypes.INTEGER,
     primaryKey: true, 
     autoIncrement: true
  },
  usuarios_idusuarios: { 
    type: DataTypes.INTEGER, 
    allowNull: false
   },
  estados_idestado: { 
    type: DataTypes.INTEGER,
    allowNull: false
  },
  nombreCompletoOrden: { 
    type: DataTypes.STRING(45),
     allowNull: false 
  },
  direccionOrden: { 
    type: DataTypes.STRING(45), 
    allowNull: false 
  },
  telefonoOrden: { 
    type: DataTypes.STRING(45),
    allowNull: false 
  },
  correoOrden: { 
    type: DataTypes.STRING(45),
    allowNull: false 
  },
  fecha_entrega: { 
    type: DataTypes.DATE,
    allowNull: false 
  },
  total_orden: { 
    type: DataTypes.FLOAT, 
    defaultValue: 0 
  },  
},{
  tableName: 'Orden',
  timestamps: false,
});

module.exports = Orden;
