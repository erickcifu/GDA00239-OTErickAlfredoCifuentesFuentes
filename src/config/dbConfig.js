const sql = require('mssql');
require('dotenv').config();

const dbConfig = {
    user: process.env.DB_USER || "admin",
    password: process.env.DB_PASSWORD || "Proyecto@2024",
    server: process.env.DB_SERVER || "localhost", 
    database: process.env.DB_NAME || "GDA00239-OT-ErickCifuentes", 
    options: {
        encrypt: true,
        trustServerCertificate: true,
        enableArithAbort: true,
    },
};

const connectDB = async () => {
    try {
        await sql.connect(dbConfig);
        console.log("Conexión exitosa a la base de datos");
    } catch (error) {
        console.error("Error al conectar a la base de datos", error.message);
        process.exit(1);
    }
};

module.exports = { sql, connectDB };
