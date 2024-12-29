require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./src/config/dbConfig');

const authRoutes = require('./src/routes/authRoutes.js');
const productoRoutes = require('./src/routes/productoRoutes.js');

const app = express();

app.use(cors());
app.use(express.json());

// Usar rutas
app.use('/api/auth', authRoutes);
app.use('/api/productos', productoRoutes);
console.log(app._router.stack.map(layer => layer.route));

// Conectar a la base de datos
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
