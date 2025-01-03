const Sequelize = require("sequelize");
const { sequelize } = require("../config/dbConfig.js");

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  port: dbConfig.port
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importar modelos
db.CategoriaProductos = require("./categoriaModel.js")(sequelize, Sequelize);
db.Clientes = require("./clienteModel.js")(sequelize, Sequelize);
db.estados = require("./estadoModel.js")(sequelize, Sequelize);
db.Orden = require("./ordenModel.js")(sequelize, Sequelize);
db.OrdenDetalles = require("./ordDetModel.js")(sequelize, Sequelize);
db.Producto = require("./productoModel.js")(sequelize, Sequelize);
db.Rol = require("./rolModel.js")(sequelize, Sequelize);
db.Usuario = require("./usuarioModel.js")(sequelize, Sequelize);

// relaciones entre los modelos
db.Orden.hasMany(db.OrdenDetalles, { foreignKey: "Orden_idOrden" });
db.OrdenDetalles.belongsTo(db.Orden, { foreignKey: "Orden_idOrden" });

db.OrdenDetalles.belongsTo(db.Producto, { foreignKey: "Productos_idProductos" });
db.Producto.hasMany(db.OrdenDetalles, { foreignKey: "Productos_idProductos" });

module.exports = db;
