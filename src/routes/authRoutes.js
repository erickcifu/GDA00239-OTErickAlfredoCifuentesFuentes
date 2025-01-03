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
