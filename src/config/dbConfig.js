const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME || "GDA00239-OT-ErickCifuentes", // Base de datos
    process.env.DB_USER || "admin", // Usuario
    process.env.DB_PASSWORD || "Proyecto@2024", // Contraseña
    {
        host: process.env.DB_SERVER || "localhost", // Servidor
        dialect: 'mssql',
        dialectOptions: {
            encrypt: true, // Si necesitas conexión encriptada
            trustServerCertificate: true, // Permitir certificado autofirmado
        },
        logging: false, // Opcional, desactiva el log para consultas
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
