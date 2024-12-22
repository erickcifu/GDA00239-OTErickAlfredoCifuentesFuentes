require('dotenv').config();
const express = require('express');
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectDB } = require('./src/config/dbConfig.js');
const productoRoutes = require('./src/routes/authRoutes.js');
const secretKey = "secret";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/', productoRoutes);

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
