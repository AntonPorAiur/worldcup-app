const express = require('express');
const authMiddleware = require('../middlewares/auth');
const pool = require('../db');

const router = express.Router();

// Ruta protegida: lista de usuarios
router.get('/usuarios', authMiddleware, async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, username, email, nombre, segundo_nombre, apellido, segundo_apellido, created_at FROM usuarios'
    );
    res.json({ usuarios: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
