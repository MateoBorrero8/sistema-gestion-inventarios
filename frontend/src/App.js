import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Productos from './pages/Productos';
import { obtenerRolDesdeToken } from './utils/auth';
import NuevoProducto from './pages/NuevoProducto';
import EditarProducto from './pages/EditarProducto';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [mostrarRegistro, setMostrarRegistro] = useState(false);
  const rol = obtenerRolDesdeToken();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  if (!token) {
    return (
      <div>
        {mostrarRegistro ? (
          <>
            <Register onRegister={() => setMostrarRegistro(false)} />
            <button onClick={() => setMostrarRegistro(false)}>¿Ya tenés cuenta? Iniciar sesión</button>
          </>
        ) : (
          <>
            <Login onLogin={setToken} />
            <button onClick={() => setMostrarRegistro(true)}>¿No tenés cuenta? Registrate</button>
          </>
        )}
      </div>
    );
  }

  return (
    <Router>
      <nav>
        <h2>Menú principal</h2>
        <ul>
          <li><Link to="/productos">Ver productos</Link></li>
          {rol === 'admin' && (
            <>
              <li><Link to="/productos/nuevo">Agregar producto</Link></li>
              {/* Podés agregar más opciones admin acá */}
            </>
          )}
          <li><button onClick={handleLogout}>Cerrar sesión</button></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/productos" />} />
        <Route path="/productos" element={<Productos />} />
        {<Route path="/productos/nuevo" element={<NuevoProducto />} />}
        <Route path="/productos/editar/:id" element={<EditarProducto />} />
      </Routes>
    </Router>
  );
}

export default App;
