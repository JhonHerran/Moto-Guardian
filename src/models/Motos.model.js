const pool = require('../config/db');

const registrarMoto = async (data) => {
  const {
    propietario,
    nombre,
    marca,
    modelo,
    kilometraje,
    ultimo_cambio_aceite,
    tiempo_pastillas_freno,
    tiempo_bandas_freno,
    kilometraje_kit_arrastre
  } = data;

  const fechaActual = new Date().toISOString().split('T')[0]; 
  
  const [result] = await pool.query(
    `INSERT INTO motos (
      propietario, nombre, marca, modelo, kilometraje,
      ultimo_cambio_aceite,
      tiempo_pastillas_freno, 
      tiempo_bandas_freno,
      kilometraje_kit_arrastre
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      propietario || null,
      nombre,
      marca,
      modelo,
      kilometraje,
      ultimo_cambio_aceite || fechaActual,     
      tiempo_pastillas_freno || fechaActual,   
      tiempo_bandas_freno || fechaActual,      
      kilometraje_kit_arrastre || 0
    ]
  );

  return { id: result.insertId, ...data };
};


const misMotos = async (propietario) => {
  const [rows] = await pool.query(
    'SELECT * FROM motos WHERE propietario = ?',
    [propietario]
  );
  return rows;
};

const actualizarMoto = async (propietario, data) => {
  const {
    nombre,
    marca,
    modelo,
    kilometraje,
    ultimo_cambio_aceite,
    tiempo_pastillas_freno,
    tiempo_bandas_freno,
    kilometraje_kit_arrastre
  } = data;

  const [motoActual] = await pool.query(
    'SELECT ultimo_cambio_aceite, tiempo_pastillas_freno, tiempo_bandas_freno FROM motos WHERE propietario = ?',
    [propietario]
  );

  const [result] = await pool.query(
    `UPDATE motos SET
      nombre = COALESCE(?, nombre),
      marca = COALESCE(?, marca),
      modelo = COALESCE(?, modelo),
      kilometraje = COALESCE(?, kilometraje),
      ultimo_cambio_aceite = ?,
      tiempo_pastillas_freno = ?,
      tiempo_bandas_freno = ?,
      kilometraje_kit_arrastre = COALESCE(?, kilometraje_kit_arrastre)
    WHERE propietario = ?`,
    [
      nombre,
      marca,
      modelo,
      kilometraje,
      ultimo_cambio_aceite || (motoActual[0]?.ultimo_cambio_aceite || new Date().toISOString().split('T')[0]),
      tiempo_pastillas_freno || (motoActual[0]?.tiempo_pastillas_freno || new Date().toISOString().split('T')[0]),
      tiempo_bandas_freno || (motoActual[0]?.tiempo_bandas_freno || new Date().toISOString().split('T')[0]),
      kilometraje_kit_arrastre,
      propietario
    ]
  );

  return result.affectedRows;
};

const eliminarMoto = async (id, propietario) => {
  const [result] = await pool.query(
    `DELETE FROM motos 
     WHERE id = ? AND propietario = ?`,
    [id, propietario]
  );

  return result.affectedRows;
};

module.exports = { 
  registrarMoto, 
  obtenerMotos, 
  misMotos, 
  actualizarMoto, 
  eliminarMoto 
};