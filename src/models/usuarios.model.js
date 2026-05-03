const pool = require('../config/db');

const registro = async ({ nombre, correo, password }) => {
  const [result] = await pool.query(
    `INSERT INTO usuarios (nombre, correo, password)
     VALUES (?, ?, ?)`,
    [nombre, correo, password]
  );

  return { id: result.insertId, nombre, correo };
};

const login = async ({ correo, password }) => {
  const [rows] = await pool.query(
    `SELECT * FROM usuarios WHERE correo = ? AND password = ?`,
    [correo, password]
  );

  return rows[0];
};

module.exports = { registro, login };