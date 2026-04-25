const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306
  }
);

sequelize.authenticate()
  .then(() => console.log('✅ Conexión Sequelize establecida'))
  .catch(err => console.error('❌ Error de conexión:', err));

module.exports = sequelize;