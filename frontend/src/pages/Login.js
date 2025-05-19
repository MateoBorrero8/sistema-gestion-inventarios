import React, { useState } from 'react';
import api from '../services/api';

function Login({ onLogin }) {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const handleSubmit = async e => {
    e.preventDefault();
    try {
    const res = await api.post('/auth/login', { email, password });
    const token = res.data.token;
    localStorage.setItem('token', token);
    onLogin(token); 
    } catch (error) {
    alert('Login fallido');
    }
};

return (
    <div>
    <h2>Iniciar sesión</h2>
    <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Contraseña" onChange={e => setPassword(e.target.value)} />
        <button type="submit">Ingresar</button>
    </form>
    </div>
);
}

export default Login;
