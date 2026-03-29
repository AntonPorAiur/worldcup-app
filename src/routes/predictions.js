const express = require('express');
const authMiddleware = require('../middlewares/auth');
const pool = require('../db');
const Prediccion = require('../models/Prediccion');

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

// Endpoint protegido
router.post('/scores', authMiddleware, async (req, res) => {
  try {
    const { matchId, ronda, scoreLocal, scoreVisitante } = req.body;

    // El userId se obtiene del token decodificado
    const userId = req.user.id;

    if (!matchId || !userId || ronda === undefined || scoreLocal === undefined || scoreVisitante === undefined) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Lógica para empate y ganador
    let empate = false;
    let ganador = "";

    if (scoreLocal === scoreVisitante) {
      empate = true;
    } else if (scoreLocal > scoreVisitante) {
      ganador = "local";
    } else {
      ganador = "visitante";
    }

    // Guardar en la base de datos
    const prediccion = await Prediccion.create({
      matchId,
      userId,
      ronda,
      scoreLocal,
      scoreVisitante,
      empate,
      ganador
    });

    res.status(201).json(prediccion);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al guardar la predicción' });
  }
});

module.exports = router;
