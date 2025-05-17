const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

const register = async (req, res) => {
const { nombre, email, password } = req.body;
try {
    const existe = await Usuario.findOne({ where: { email } });
    if (existe) return res.status(400).json({ mensaje: 'El email ya está registrado' });

    const hashedPassword = await bcrypt.hash(password, 10);
    await Usuario.create({ nombre, email, password: hashedPassword, rol: 'user'});

    res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
} catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
}
};

const login = async (req, res) => {
const { email, password } = req.body;
try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    const valid = await bcrypt.compare(password, usuario.password);
    if (!valid) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

    const token = jwt.sign(
    { id: usuario.id, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
    );

    res.status(200).json({
    mensaje: 'Login exitoso',
    token,
    usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
    }
    });
} catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
}
};

module.exports = { register, login };
