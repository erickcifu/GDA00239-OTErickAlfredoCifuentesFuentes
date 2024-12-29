const express = require('express');
const { autenticar } = require('../middleware/authMiddleware');
const { obtenerProductos, crearProducto, actualizarProducto, desactivarProducto } = require('../controllers/productoController.js');
const router = express.Router();

router.get('/:idProducto?', obtenerProductos);
router.post('/',autenticar, crearProducto);
router.put('/:idProducto',autenticar,  actualizarProducto);
router.delete('/:idProducto',  desactivarProducto);

module.exports = router;
