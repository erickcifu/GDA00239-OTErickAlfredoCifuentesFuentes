const express = require('express');
const { autenticar } = require('../middleware/authMiddleware');
const { validarRol } = require('../middleware/roleMiddleware');
const { obtenerUsuarioPorId,login, registro, actualizarUsuario, desactivarUsuario, } = require('../controllers/authController');

const router = express.Router();

router.post('/login', login);
router.post('/registro', registro);
router.get('/usuarios/:idUsuarios?', autenticar,validarRol([1, 3]), obtenerUsuarioPorId);
router.put('/usuarios/:idUsuarios', autenticar,validarRol([1, 3]), actualizarUsuario);
router.delete('/usuarios/:idUsuarios', autenticar,validarRol([1, 3]), desactivarUsuario);

module.exports = router;
