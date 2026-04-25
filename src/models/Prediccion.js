const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // instancia de Sequelize

const Prediccion = sequelize.define('Prediccion', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  match_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'partidos',
      key: 'matchId'
    }
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'usuarios',
      key: 'id'
    }
  },
  ronda: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  pred_local: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  pred_visitante: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  empate: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  pred_ganador: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  calculado_en: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'predicciones',
  timestamps: false // desactivamos createdAt/updatedAt automáticos
});

module.exports = Prediccion;