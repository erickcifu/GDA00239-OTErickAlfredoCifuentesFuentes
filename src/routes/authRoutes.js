// const { obtenerOrdenCompleta, crearOrden, actualizarOrden, desactivarOrden } = require('../controllers/ordenController');
// // orden obtenerOrdenCompleta obtenerOrdenCompleta, crearOrden, actualizarOrden, desactivarOrden
// router.get('/orden/:idOrden?', autenticar,  obtenerOrdenCompleta);
// router.post('/orden', autenticar, crearOrden);
// router.put('/orden/:idOrden', autenticar,  actualizarOrden);
// router.delete('/orden/:idOrden',autenticar, desactivarOrden);
// module.exports = router;
const express = require('express');
const { autenticar } = require('../middleware/authMiddleware');
const { obtenerUsuarioPorId,login, registro, actualizarUsuario, desactivarUsuario, } = require('../controllers/authController');

const router = express.Router();

router.post('/login', login);
router.post('/registro', registro);
router.get('/usuarios/:idUsuarios?', autenticar, obtenerUsuarioPorId);
router.put('/usuarios/:idUsuarios', autenticar, actualizarUsuario);
router.delete('/usuarios/:idUsuarios', autenticar, desactivarUsuario);

module.exports = router;
