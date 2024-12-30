const express = require('express');
const { autenticar } = require('../middleware/authMiddleware');
const { obtenerCategoria, crearCategoria, ActualizarCategoria, desactivarCategoria } = require('../controllers/categoriaController');
const router = express.Router();

router.get('/:idCategoriaProducto?', autenticar, obtenerCategoria);
router.post('/', autenticar, crearCategoria);
router.put('/:idCategoriaProducto', autenticar, ActualizarCategoria);
router.delete('/:idCategoriaProducto', autenticar, desactivarCategoria);

module.exports = router;