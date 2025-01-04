const express = require('express');
const { autenticar } = require('../middleware/authMiddleware');
const { validarRol } = require('../middleware/roleMiddleware');
const { obtenerOrdenCompleta, crearOrden, actualizarOrden, desactivarOrden,  } = require('../controllers/ordenController.js');
const router = express.Router();

router.get('/:idOrden?',  obtenerOrdenCompleta);
router.post('/',autenticar, validarRol([1, 2]), crearOrden);
router.put('/:idOrden',autenticar, validarRol([1, 3]),  actualizarOrden);
router.delete('/:idOrden',autenticar, validarRol([1, 3]), desactivarOrden);

module.exports = router;