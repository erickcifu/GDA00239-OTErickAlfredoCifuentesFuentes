const express = require('express');
const { autenticar } = require('../middleware/authMiddleware');
const { obtenerOrdenCompleta, crearOrden, actualizarOrden, desactivarOrden,  } = require('../controllers/ordenController.js');
const router = express.Router();

router.get('/:idOrden?',  obtenerOrdenCompleta);
router.post('/', crearOrden);
router.put('/:idOrden',  actualizarOrden);
router.delete('/:idOrden', desactivarOrden);

module.exports = router;