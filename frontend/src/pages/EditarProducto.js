import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { obtenerRolDesdeToken } from '../utils/auth';

function EditarProducto() {
const { id } = useParams();
const navigate = useNavigate();
const rol = obtenerRolDesdeToken();
const [formulario, setFormulario] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: ''
});

useEffect(() => {
    const fetchProducto = async () => {
    const token = localStorage.getItem('token');
    try {
        const res = await api.get('/productos', {
        headers: { Authorization: `Bearer ${token}` }
        });
        const producto = res.data.find(p => p.id === parseInt(id));
        if (producto) setFormulario(producto);
        else alert('Producto no encontrado');
    } catch (error) {
        alert('Error al cargar producto');
    }
    };
    fetchProducto();
}, [id]);

const handleChange = e => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
};

const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
    await api.put(`/productos/${id}`, formulario, {
        headers: { Authorization: `Bearer ${token}` }
    });
    alert('Producto actualizado');
    navigate('/productos');
    } catch (error) {
    alert('Error al actualizar');
    }
};

if (rol !== 'admin') {
    return <p>⛔ Solo administradores pueden editar productos.</p>;
}

return (
    <div>
    <h2>Editar Producto</h2>
    <form onSubmit={handleSubmit}>
        <input type="text" name="nombre" placeholder="Nombre" value={formulario.nombre} onChange={handleChange} />
        <input type="text" name="descripcion" placeholder="Descripción" value={formulario.descripcion} onChange={handleChange} />
        <input type="number" name="precio" placeholder="Precio" value={formulario.precio} onChange={handleChange} />
        <input type="number" name="stock" placeholder="Stock" value={formulario.stock} onChange={handleChange} />
        <button type="submit">Actualizar</button>
    </form>
    </div>
);
}

export default EditarProducto;
