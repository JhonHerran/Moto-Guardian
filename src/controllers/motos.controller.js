const MotosModel = require('../models/Motos.model');

const registrarMoto = async (req, res) => {
  try {
    const data = await MotosModel.registrarMoto(req.body);

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


const misMotos = async (req, res) => {
  try {
    
    const propietario = req.params.propietario;
    
    console.log('Buscando motos de:', propietario);
    
    const data = await MotosModel.misMotos(propietario);

    res.json({
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


const actualizarMoto = async (req, res) => {
  try {
    const { propietario } = req.body; 
    
    if (!propietario) {
      return res.status(400).json({
        ok: false,
        msg: 'El propietario es requerido'
      });
    }

    const updated = await MotosModel.actualizarMoto(propietario, req.body);

    if (updated === 0) {
      return res.status(404).json({
        ok: false,
        msg: 'No tienes ninguna moto registrada para actualizar'
      });
    }

    res.json({
      ok: true,
      msg: 'Moto actualizada correctamente'
    });

  } catch (err) {
    res.status(500).json({
      ok: false,
      msg: err.message
    });
  }
};

const eliminarMoto = async (req, res) => {
  try {
    const id = req.params.id;
    const { usuario_id } = req.body;

    if (!usuario_id) {
      return res.status(400).json({
        ok: false,
        msg: 'usuario_id es requerido'
      });
    }

    const deleted = await MotosModel.eliminarMoto(id, usuario_id);

    if (!deleted) {
      return res.status(404).json({
        ok: false,
        msg: 'Moto no encontrada o no pertenece al usuario'
      });
    }

    res.json({
      ok: true,
      msg: 'Moto eliminada correctamente'
    });

  } catch (err) {
    res.status(500).json({
      ok: false,
      msg: err.message
    });
  }
};

module.exports = { registrarMoto, obtenerMotos, misMotos, actualizarMoto, eliminarMoto };