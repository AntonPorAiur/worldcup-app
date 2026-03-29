// models/Prediccion.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // instancia de conexión

const Prediccion = sequelize.define('Prediccion', {
  matchId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ronda: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  scoreLocal: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  scoreVisitante: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  empate: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  ganador: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'predictions'
});

module.exports = Prediccion;