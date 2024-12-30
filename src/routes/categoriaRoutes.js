const express = require('express');
const { autenticar } = require('../middleware/authMiddleware');
const { obtenerCategoria, crearCategoria, ActualizarCategoria, desactivarCategoria } = require('../controllers/categoriaController');
const router = express.Router();

router.get('/:idCategoriaProducto?', obtenerCategoria);
router.post('/', crearCategoria);
router.put('/:idCategoriaProducto', ActualizarCategoria);
router.delete('/:idCategoriaProducto', desactivarCategoria);

module.exports = router;