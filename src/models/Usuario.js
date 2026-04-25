const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Usuario = sequelize.define('Usuario', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  username: { type: DataTypes.STRING(50), unique: true, allowNull: false },
  password: { type: DataTypes.STRING(255), allowNull: false },
  email: { type: DataTypes.STRING(100), unique: true },
  nombre: { type: DataTypes.STRING(50), allowNull: true }, 
  segundo_nombre: { type: DataTypes.STRING(50), allowNull: true },
  apellido: { type: DataTypes.STRING(50), allowNull: true },
  segundo_apellido: { type: DataTypes.STRING(50), allowNull: true },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'usuarios',
  timestamps: false
});

module.exports = Usuario;