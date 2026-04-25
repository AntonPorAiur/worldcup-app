require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const authRoutes = require('./routes/auth');
const predictionRoutes = require('./routes/predictions');
const adminRoutes = require('./routes/admin');
const partidosRoutes = require('./routes/partidos');

const app = express();
app.use(express.json());

// Configuración básica de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Mundial App',
      version: '1.0.0',
      description: 'Documentación de endpoints para predicciones de partidos'
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./src/routes/*.js', './src/app.js'], // rutas donde pondrás comentarios JSDoc
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Ruta raíz para confirmar que el servidor está vivo
app.get('/', (req, res) => {
  res.send("Hello I'm alive");
});

// Rutas
app.use('/auth', authRoutes);
app.use('/prediction', predictionRoutes);
app.use('/admin', adminRoutes);
app.use('/match', partidosRoutes);

// probar conexión
sequelize.authenticate()
  .then(() => console.log('✅ Conexión establecida'))
  .catch(err => console.error('❌ Error de conexión:', err));

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
