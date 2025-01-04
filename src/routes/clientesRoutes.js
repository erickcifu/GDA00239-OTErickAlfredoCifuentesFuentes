const express = require('express');
const { autenticar } = require('../middleware/authMiddleware');
const { validarRol } = require('../middleware/roleMiddleware');
const { obtenerClientes, crearCliente, ActualizarCliente } = require('../controllers/clienteController.js');
const router = express.Router();

router.get('/:idCliente?', autenticar,validarRol([1, 2]), obtenerClientes);
router.post('/', autenticar,validarRol([1, 2]), crearCliente);
router.put('/:idCliente', autenticar,validarRol([1, 2]),  ActualizarCliente);

module.exports = router;