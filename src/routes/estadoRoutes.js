const express = require('express');
const { autenticar } = require('../middleware/authMiddleware');
const {  obtenerEstado, crearEstado, ActualizarEstado } = require('../controllers/estadoController');
const router = express.Router();

router.get('/:idestado?', autenticar, obtenerEstado);
router.post('/', autenticar, crearEstado);
router.put('/:idestado', autenticar, ActualizarEstado);


module.exports = router;