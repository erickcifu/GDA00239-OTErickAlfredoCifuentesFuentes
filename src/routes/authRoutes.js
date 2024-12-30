// const express = require('express');
// const {autenticar} = require('../middleware/authMiddleware');
// const {obtenerUsuarioPorId,login, registro, ActualizarUsuarios, desactivarUsuario} = require('../controllers/authController');
// const { obtenerProductos, crearProducto, actualizarProducto, desactivarProducto } = require('../controllers/productoController');
// const { obtenerClientes, crearCliente, ActualizarCliente } = require('../controllers/clienteController');
// const { obtenerCategoria, crearCategoria, ActualizarCategoria, desactivarCategoria } = require('../controllers/categoriaController');
// const { obtenerRol, crearRol, ActualizarRol } = require('../controllers/rolController');
// const {  obtenerEstado, crearEstado, ActualizarEstado } = require('../controllers/estadoController');
// const { obtenerOrdenCompleta, crearOrden, actualizarOrden, desactivarOrden } = require('../controllers/ordenController');
// const router = express.Router();

// //Inicio de sesion
// router.post('/login', login);
// router.post('/registro', registro);
// router.put('/usuarios/:idUsuarios', autenticar, ActualizarUsuarios);
// router.get('/usuarios/:idUsuarios?', autenticar, obtenerUsuarioPorId)
// router.delete('/usuarios/:idUsuarios', autenticar, desactivarUsuario);

// // productos
// router.get('/productos/:idProducto?', autenticar, obtenerProductos); 
// router.post('/productos', autenticar, crearProducto);
// router.put('/productos/:idProducto',autenticar, actualizarProducto);
// router.delete('/productos/:idProducto', autenticar, desactivarProducto);

// //clientes
// router.get('/clientes/:idCliente?', autenticar, obtenerClientes);
// router.post('/clientes', autenticar, crearCliente);
// router.put('/clientes/:idCliente', autenticar, ActualizarCliente);

// //categoria producto obtenerCategoria, crearCategoria, ActualizarCategoria, desactivarCategoria 
// router.get('/categoria/:idCategoriaProducto?', autenticar, obtenerCategoria);
// router.post('/categoria', autenticar, crearCategoria);
// router.put('/categoria/:idCategoriaProducto', autenticar, ActualizarCategoria);
// router.delete('/categoria/:idCategoriaProducto', autenticar, desactivarCategoria);

// // rol obtenerRol, crearRol, ActualizarRol
// router.get('/rol/:idRol?', autenticar, obtenerRol);
// router.post('/rol', autenticar, crearRol);
// router.put('/rol/:idRol', autenticar, ActualizarRol);

// // estado  obtenerEstado, crearEstado, ActualizarEstado
// router.get('/estado/:idestado?', autenticar, obtenerEstado);
// router.post('/estado', autenticar, crearEstado);
// router.put('/estado/:idestado', autenticar, ActualizarEstado);

// // orden obtenerOrdenCompleta obtenerOrdenCompleta, crearOrden, actualizarOrden, desactivarOrden
// router.get('/orden/:idOrden?', autenticar,  obtenerOrdenCompleta);
// router.post('/orden', autenticar, crearOrden);
// router.put('/orden/:idOrden', autenticar,  actualizarOrden);
// router.delete('/orden/:idOrden',autenticar, desactivarOrden);

// module.exports = router;


// const express = require('express');
// const { autenticar } = require('../middleware/authMiddleware');
// const { obtenerUsuarioPorId, login, registro, ActualizarUsuarios, desactivarUsuario } = require('../controllers/authController');

// const router = express.Router();

// router.post('/login', login);
// router.post('/registro', registro);
// router.put('/usuarios/:idUsuarios', autenticar, ActualizarUsuarios);
// router.get('/usuarios/:idUsuarios?', autenticar, obtenerUsuarioPorId);
// router.delete('/usuarios/:idUsuarios', autenticar, desactivarUsuario);

// module.exports = router;

const express = require('express');
const { autenticar } = require('../middleware/authMiddleware');
const { obtenerUsuarioPorId,login, registro, actualizarUsuario, desactivarUsuario, } = require('../controllers/authController');

const router = express.Router();

router.post('/login', login);
router.post('/registro', registro);
router.get('/usuarios/:idUsuarios?', obtenerUsuarioPorId);
router.put('/usuarios/:idUsuarios', actualizarUsuario);
router.delete('/usuarios/:idUsuarios', desactivarUsuario);

module.exports = router;
