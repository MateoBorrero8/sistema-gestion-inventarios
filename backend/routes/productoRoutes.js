const express = require('express');
const router = express.Router();
const { crearProducto, obtenerProductos, actualizarProducto, eliminarProducto } = require('../controllers/productoController');
const { verificarToken, verificarAdmin, verificarEmpleado } = require('../middleware/authMiddleware');

// Crear producto
router.post('/', verificarToken, verificarAdmin, crearProducto); // solo usuarios con token pueden agregar productos

// Obtener todos los productos
router.get('/', verificarToken, obtenerProductos);

// Editar producto
router.put('/:id', verificarToken, verificarAdmin, actualizarProducto);

// Eliminar producto
router.delete('/:id', verificarToken, verificarAdmin, eliminarProducto);

router.patch('/stock/:id', verificarToken, verificarEmpleado, async (req, res) => {
const { id } = req.params;
const { stock } = req.body;

try {
    const producto = await require('../models').Producto.findByPk(id);
    if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });

    producto.stock = stock;
    await producto.save();

    res.json({ mensaje: 'Stock actualizado', producto });
} catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar stock' });
}
});



module.exports = router;
