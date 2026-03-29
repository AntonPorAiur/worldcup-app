const express = require('express');
const authMiddleware = require('../middlewares/auth');
const pool = require('../db');

const router = express.Router();

// Ruta protegida: partidos futuros sin resultado
router.get('/pendientes', authMiddleware, async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, equipo_local, equipo_visitante, fecha, estadio
       FROM partidos
       WHERE resultado_local IS NULL
         AND resultado_visitante IS NULL
         AND fecha > NOW()
       ORDER BY fecha ASC`
    );
    res.json({ partidos_pendientes: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
