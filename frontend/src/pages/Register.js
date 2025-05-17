import React, { useState } from 'react';
import api from '../services/api';

function Register({ onRegister }) {
const [nombre, setNombre] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const handleSubmit = async e => {
    e.preventDefault();
    try {
    await api.post('/auth/register', { nombre, email, password });
    alert('Registro exitoso. Ahora iniciá sesión.');
      onRegister(); // redirigir o cambiar vista
    } catch (error) {
    alert('Error al registrar');
    }
};

return (
    <div>
    <h2>Registrarse</h2>
    <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nombre" onChange={e => setNombre(e.target.value)} />
        <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Contraseña" onChange={e => setPassword(e.target.value)} />
        <button type="submit">Registrarme</button>
    </form>
    </div>
);
}

export default Register;
