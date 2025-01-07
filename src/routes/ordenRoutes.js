const express = require('express');
const { autenticar } = require('../middleware/authMiddleware');
const { validarRol } = require('../middleware/roleMiddleware');
const { obtenerOrdenCompleta, crearOrden, actualizarOrden, desactivarOrden, obtenerOrdenesUsuario, } = require('../controllers/ordenController.js');
const router = express.Router();

router.get('/:idOrden?',  obtenerOrdenCompleta);
router.get('/ordenesUsuario/:idUsuario',  obtenerOrdenesUsuario);
router.post('/',autenticar, validarRol([1, 2]), crearOrden);
router.put('/:idOrden',autenticar, validarRol([1, 2]),  actualizarOrden);
router.delete('/:idOrden',autenticar, validarRol([1, 2]), desactivarOrden);

module.exports = router;