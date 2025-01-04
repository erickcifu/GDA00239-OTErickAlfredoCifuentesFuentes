const express = require('express');
const { autenticar } = require('../middleware/authMiddleware');
const { validarRol } = require('../middleware/roleMiddleware');
const { obtenerCategoria, crearCategoria, ActualizarCategoria, desactivarCategoria } = require('../controllers/categoriaController');
const router = express.Router();

router.get('/:idCategoriaProducto?', autenticar,validarRol([1, 2]), obtenerCategoria);
router.post('/', autenticar,validarRol([1, 2]), crearCategoria);
router.put('/:idCategoriaProducto', autenticar,validarRol([1, 2]), ActualizarCategoria);
router.delete('/:idCategoriaProducto', autenticar,validarRol([1, 2]), desactivarCategoria);

module.exports = router;