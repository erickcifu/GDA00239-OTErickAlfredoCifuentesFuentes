require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./src/config/dbConfig');

//const db = require('./src/models');

const authRoutes = require('./src/routes/authRoutes.js');
const productoRoutes = require('./src/routes/productoRoutes.js');
const clientesRoutes = require('./src/routes/clientesRoutes.js');
const categoriaRoutes = require('./src/routes/categoriaRoutes.js');
const rolRoutes = require('./src/routes/rolRoutes.js');
const estadoRoutes = require('./src/routes/estadoRoutes.js');
const ordenRoutes = require('./src/routes/ordenRoutes.js');

const app = express();

app.use(cors());
app.use(express.json());

// Usar rutas
app.use('/api/auth', authRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/categoria', categoriaRoutes);
app.use('/api/rol', rolRoutes);
app.use('/api/estado', estadoRoutes);
app.use('/api/orden', ordenRoutes);


// Conectar a la base de datos
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

