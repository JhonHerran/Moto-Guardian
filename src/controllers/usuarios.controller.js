const usuarioModel = require('../models/usuarios.model');

const registro = async (req, res) => {
  try {
    const { nombre, correo, password } = req.body;

    const data = await usuarioModel.registro({
      nombre,
      correo,
      password
    });

    res.status(201).json({
      ok: true,
      data
    });

  } catch (err) {
    res.status(500).json({
      ok: false,
      msg: err.message
    });
  }
};
const login = async (req, res) => {
  try {
    const { correo, password } = req.body;

    const usuario = await usuarioModel.login({ correo, password });

    if (!usuario) {
      return res.status(401).json({
        ok: false,
        msg: 'Correo o contraseña incorrectos'
      });
    }

    res.json({
      ok: true,
      usuario
    });

  } catch (err) {
    res.status(500).json({
      ok: false,
      msg: err.message
    });
  }
};
module.exports = { registro, login };