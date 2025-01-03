const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME || "GDA00239-OT-ErickCifuentes", 
    process.env.DB_USER || "admin", 
    process.env.DB_PASSWORD || "Proyecto@2024",
    {
        host: process.env.DB_SERVER || "localhost",
        dialect: 'mssql',
        dialectOptions: {
            encrypt: true,
            trustServerCertificate: true, 
        },
        logging: false,
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Conexión exitosa a la base de datos con Sequelize");
    } catch (error) {
        console.error("Error al conectar a la base de datos", error.message);
        process.exit(1);
    }
};

module.exports = { sequelize, connectDB };
