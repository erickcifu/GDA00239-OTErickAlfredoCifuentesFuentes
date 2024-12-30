const express = require('express');
const { autenticar } = require('../middleware/authMiddleware');
const { obtenerProductos, crearProducto, actualizarProducto, desactivarProducto } = require('../controllers/productoController.js');
const router = express.Router();

router.get('/:idProducto?', autenticar, obtenerProductos);
router.post('/',autenticar, crearProducto);
router.put('/:idProducto',autenticar,  actualizarProducto);
router.delete('/:idProducto', autenticar,  desactivarProducto);

module.exports = router;
