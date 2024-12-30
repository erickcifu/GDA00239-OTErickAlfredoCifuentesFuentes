const express = require('express');
const { autenticar } = require('../middleware/authMiddleware');
const { obtenerRol, crearRol, ActualizarRol } = require('../controllers/rolController');
const router = express.Router();

router.get('/:idRol?', autenticar, obtenerRol);
router.post('/', autenticar, crearRol);
router.put('/:idRol', autenticar, ActualizarRol);

module.exports = router;