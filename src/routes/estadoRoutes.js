const express = require('express');
const { autenticar } = require('../middleware/authMiddleware');
const { validarRol } = require('../middleware/roleMiddleware');
const {  obtenerEstado, crearEstado, ActualizarEstado } = require('../controllers/estadoController');
const router = express.Router();

router.get('/:idestado?', autenticar,validarRol([1 , 3]), obtenerEstado);
router.post('/', autenticar,validarRol([1]), crearEstado);
router.put('/:idestado', autenticar,validarRol([1]), ActualizarEstado);


module.exports = router;