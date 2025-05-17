const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
const authHeader = req.headers['authorization'];
const token = authHeader && authHeader.split(' ')[1];

if (!token) {
    return res.status(401).json({ mensaje: 'Acceso denegado. Token no proporcionado.' });
}

try {
    const verificado = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = verificado; // Guardamos los datos del usuario en el request
    next();
} catch (error) {
    res.status(403).json({ mensaje: 'Token inválido o expirado.' });
}
};

const verificarAdmin = (req, res, next) => {
if (req.usuario.rol !== 'admin') {
    return res.status(403).json({ mensaje: 'Acceso restringido solo para administradores' });
}
next();
};

const verificarEmpleado = (req, res, next) => {
const rol = req.usuario.rol;
if (rol !== 'empleado') {
    return res.status(403).json({ mensaje: 'Acceso solo para empleados' });
}
next();
};


module.exports = { verificarToken, verificarAdmin, verificarEmpleado };

