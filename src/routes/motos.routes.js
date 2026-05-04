const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/motos.controller');

router.post('/registrar-moto', ctrl.registrarMoto);
router.get('/propietario/:propietario', ctrl.misMotos);
router.put('/actualizar', ctrl.actualizarMoto);
router.delete('/motos/:id', ctrl.eliminarMoto);

module.exports = router;