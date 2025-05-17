import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { obtenerRolDesdeToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';


function Productos() {
const [productos, setProductos] = useState([]);
const rol = obtenerRolDesdeToken();
const navigate = useNavigate();


useEffect(() => {
    const obtenerProductos = async () => {
    const token = localStorage.getItem('token');
    try {
        const res = await api.get('/productos', {
        headers: { Authorization: `Bearer ${token}` }
        });
        setProductos(res.data);
    } catch (error) {
        alert('Error al cargar productos');
    }
    };

    obtenerProductos();
}, []);

const eliminarProducto = async (id) => {
const token = localStorage.getItem('token');
try {
    await api.delete(`/productos/${id}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
    });

    // Actualizar el estado local de productos si estás usando useState
    setProductos(prev => prev.filter(p => p.id !== id));
} catch (error) {
    alert('Error al eliminar producto');
    console.error(error);
}
};

const actualizarStock = async (id) => {
const nuevoStock = prompt('Nuevo valor de stock:');
if (!nuevoStock || isNaN(nuevoStock)) {
    alert('Stock inválido');
    return;
}

const token = localStorage.getItem('token');
try {
    await api.patch(`/productos/stock/${id}`, { stock: parseInt(nuevoStock) }, {
    headers: { Authorization: `Bearer ${token}` }
    });
    setProductos(productos.map(p =>
    p.id === id ? { ...p, stock: parseInt(nuevoStock) } : p
    ));
    alert('Stock actualizado ✅');
} catch (error) {
    alert('Error al actualizar stock');
}
};



return (
    <div>
    <h2>Listado de Productos</h2>
    <ul>
        {productos.map(p => (
        <li key={p.id}>
            {p.nombre} - ${p.precio} - Stock: {p.stock}
            {rol === 'empleado' && (
            <button onClick={() => actualizarStock(p.id)}>📦 Actualizar stock</button>
        )}
            {rol === 'admin' && (
            <>
                <button onClick={() => navigate(`/productos/editar/${p.id}`)}>✏️</button>
                <button onClick={() => eliminarProducto(p.id)}>🗑️</button>
            </>
        )}
        </li>
        ))}
    </ul>
    </div>
);
}

export default Productos;
