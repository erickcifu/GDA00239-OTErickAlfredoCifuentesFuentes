const express = require('express');
const { autenticar } = require('../middleware/authMiddleware');
const { validarRol } = require('../middleware/roleMiddleware');
const { obtenerProductos, crearProducto, actualizarProducto, desactivarProducto } = require('../controllers/productoController.js');
const router = express.Router();

router.get('/:idProducto?', autenticar, obtenerProductos);
router.post('/',autenticar, validarRol([1, 3]), crearProducto);
router.put('/:idProducto',autenticar,validarRol([1, 3]),  actualizarProducto);
router.delete('/:idProducto', autenticar,validarRol([3]),  desactivarProducto);

module.exports = router;
