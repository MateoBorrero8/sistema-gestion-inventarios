const { Producto } = require('../models');

// Crear un nuevo producto
const crearProducto = async (req, res) => {
const { nombre, descripcion, precio, stock } = req.body;

try {
    // Validaciones simples
    if (!nombre || !precio || stock == null) {
    return res.status(400).json({ mensaje: 'Faltan datos obligatorios' });
    }

    const nuevoProducto = await Producto.create({
    nombre,
    descripcion,
    precio,
    stock
    });

    res.status(201).json({
    mensaje: 'Producto creado exitosamente',
    producto: nuevoProducto
    });
} catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear producto' });
}
};

// Listado de Productos
const obtenerProductos = async (req, res) => {
try {
    const productos = await Producto.findAll();
    res.status(200).json(productos);
} catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener productos' });
}
};

// Actualización de Productos
const actualizarProducto = async (req, res) => {
const { id } = req.params;
const { nombre, descripcion, precio, stock } = req.body;

try {
    const producto = await Producto.findByPk(id);
    if (!producto) {
    return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    // Actualiza los campos
    producto.nombre = nombre ?? producto.nombre;
    producto.descripcion = descripcion ?? producto.descripcion;
    producto.precio = precio ?? producto.precio;
    producto.stock = stock ?? producto.stock;

    await producto.save();

    res.status(200).json({
    mensaje: 'Producto actualizado correctamente',
    producto
    });
} catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar producto' });
}
};

// Eliminar Producto
const eliminarProducto = async (req, res) => {
const { id } = req.params;

try {
    const producto = await Producto.findByPk(id);
    if (!producto) {
    return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    await producto.destroy();

    res.status(200).json({ mensaje: 'Producto eliminado correctamente' });
} catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar producto' });
}
};


module.exports = {
crearProducto,
obtenerProductos,
actualizarProducto,
eliminarProducto
};
