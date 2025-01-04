const express = require('express');
const { autenticar } = require('../middleware/authMiddleware');
const { validarRol } = require('../middleware/roleMiddleware');
const { obtenerRol, crearRol, ActualizarRol } = require('../controllers/rolController');
const router = express.Router();

router.get('/:idRol?', autenticar,validarRol([1]), obtenerRol);
router.post('/', autenticar,validarRol([1, 3]), crearRol);
router.put('/:idRol', autenticar,validarRol([1, 3]), ActualizarRol);

module.exports = router;