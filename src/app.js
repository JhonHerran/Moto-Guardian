const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(express.json());

// Rutas
const usuariosRoutes = require('./routes/usuarios.routes');
const motosRoutes = require('./routes/motos.routes');

// Usar rutas
app.use('/usuarios', usuariosRoutes);
app.use('/motos', motosRoutes);


// Ruta base
app.get('/', (req, res) => {
  res.json({
    ok: true,
    msg: 'API MotoGuardian funcionando correctamente'
  });
});

module.exports = app;