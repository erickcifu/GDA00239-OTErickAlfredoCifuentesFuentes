const express = require('express');
const { autenticar } = require('../middleware/authMiddleware');
const { obtenerClientes, crearCliente, ActualizarCliente } = require('../controllers/clienteController.js');
const router = express.Router();

router.get('/:idCliente?', obtenerClientes);
router.post('/', crearCliente);
router.put('/:idCliente',  ActualizarCliente);

module.exports = router;