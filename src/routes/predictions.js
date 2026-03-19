const express = require('express');
const authMiddleware = require('../middlewares/auth');
const pool = require('../db');

const router = express.Router();

// Ruta protegida: solo accesible con token válido
router.get('/', authMiddleware, async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM predictions WHERE user_id = ?',
      [req.user.id] // req.user viene del middleware
    );
    res.json({ user: req.user.username, predictions: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
