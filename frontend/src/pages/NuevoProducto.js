import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { obtenerRolDesdeToken } from '../utils/auth';

function NuevoProducto() {
const navigate = useNavigate();
const rol = obtenerRolDesdeToken();

const [formulario, setFormulario] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: ''
});

const handleChange = e => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
};

const handleSubmit = async e => {
    e.preventDefault();
    try {
    const token = localStorage.getItem('token');
    await api.post('/productos', formulario, {
        headers: {
        Authorization: `Bearer ${token}`
        }
    });
    alert('Producto creado ✅');
    navigate('/productos');
    } catch (error) {
    alert('Error al crear producto');
    }
};

// Si el que ingresa no es admin, se le muestra este mensaje para las funciones a las que no puede acceder
if (rol !== 'admin') {
    return <p>⛔ Acceso restringido: solo administradores pueden ver esta página.</p>;
}

return (
    <div>
    <h2>Nuevo Producto</h2>
    <form onSubmit={handleSubmit}>
        <input type="text" name="nombre" placeholder="Nombre" value={formulario.nombre} onChange={handleChange} />
        <input type="text" name="descripcion" placeholder="Descripción" value={formulario.descripcion} onChange={handleChange} />
        <input type="number" name="precio" placeholder="Precio" value={formulario.precio} onChange={handleChange} />
        <input type="number" name="stock" placeholder="Stock" value={formulario.stock} onChange={handleChange} />
        <button type="submit">Crear</button>
    </form>
    </div>
);
}

export default NuevoProducto;
