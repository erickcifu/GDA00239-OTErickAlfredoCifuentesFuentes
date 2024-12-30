const express = require('express');
const { autenticar } = require('../middleware/authMiddleware');
const { obtenerClientes, crearCliente, ActualizarCliente } = require('../controllers/clienteController.js');
const router = express.Router();

router.get('/:idCliente?', autenticar, obtenerClientes);
router.post('/', autenticar, crearCliente);
router.put('/:idCliente', autenticar,  ActualizarCliente);

module.exports = router;