const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
res.send('API funcionando');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
console.log(`Servidor corriendo en puerto ${PORT}`);
});

const productoRoutes = require('./routes/productoRoutes');

app.use('/api/productos', productoRoutes);

