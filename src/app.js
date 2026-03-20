const express = require('express');
const authRoutes = require('./routes/auth');
const predictionRoutes = require('./routes/predictions');
const adminRoutes = require('./routes/admin');

const app = express();
app.use(express.json());

// Ruta raíz para confirmar que el servidor está vivo
app.get('/', (req, res) => {
  res.send("Hello I'm alive");
});

// Rutas
app.use('/auth', authRoutes);
app.use('/predictions', predictionRoutes);
app.use('/admin', adminRoutes);

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
