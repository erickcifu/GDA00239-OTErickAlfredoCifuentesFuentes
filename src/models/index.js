const Sequelize = require("sequelize");
const dbConfig = require("../config/dbConfig.js");

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
db.Producto = require("./productoModel.js")(sequelize, Sequelize);
db.Rol = require("./rolModel.js")(sequelize, Sequelize);
db.Usuario = require("./usuarioModel.js")(sequelize, Sequelize);


module.exports = db;
