import { jwtDecode } from 'jwt-decode';

export const obtenerRolDesdeToken = () => {
try {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const decoded = jwtDecode(token);
    return decoded.rol || null;
} catch (error) {
    return null;
}
};
