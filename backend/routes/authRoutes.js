const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/authController');
const { verificarToken } = require('../middleware/authMiddleware');

// Registro y login
router.post('/register', register);
router.post('/login', login);

// Ruta protegida de prueba (opcional)
router.get('/perfil', verificarToken, (req, res) => {
res.json({
    mensaje: 'Acceso autorizado',
    usuario: req.usuario
});
});

module.exports = router;
