
# 📦 Sistema de Gestión de Inventario para Comercios Locales

Este proyecto corresponde al **Trabajo Final Integrador** de la materia **Programación 3**. Consiste en una aplicación web completa, con autenticación de usuarios y gestión de productos, destinada a negocios que desean administrar su inventario de forma sencilla y segura.

---

## ✅ Requisitos del Trabajo

### 1. Desarrollo de una Aplicación Funcional

✔️ Aplicación web con arquitectura cliente-servidor (Frontend/Backend)  
✔️ Validación para inicio de sesión  
✔️ Gestión de datos: crear, listar, actualizar y eliminar productos  
✔️ Generación de tokens JWT para autenticación  
✔️ Uso de Sequelize como ORM  
✔️ Implementación de API REST propia  
✔️ Base de datos relacional (PostgreSQL) correctamente normalizada  

---

## 🧪 Criterios de Evaluación

- 🏗️ Arquitectura bien definida entre Frontend (React) y Backend (Express)
- 🔒 Seguridad: encriptación de contraseñas con `bcrypt`, rutas protegidas con middlewares
- 🧱 Relaciones claras entre usuarios y productos
- 🧬 ORM con Sequelize

---

## 👥 Roles de usuario

- `admin`: puede crear, ver, editar y eliminar productos
- `empleado`: puede ver productos y actualizar el stock
- `user`: solo puede ver productos

---

## 🖥️ Tecnologías utilizadas

- **Frontend**: React, React Router, Axios, CSS
- **Backend**: Node.js, Express.js, Sequelize
- **Base de Datos**: PostgreSQL
- **Autenticación**: JWT
- **Seguridad**: Bcrypt para encriptar contraseñas
- **ORM**: Sequelize
- **Herramientas**: Git, GitHub, Postman

---

## 🧭 Flujo de Usuario

1. El usuario accede al sistema y se registra o inicia sesión
2. Según su rol (`admin`, `empleado`, `user`) accede a distintas funcionalidades
3. Los administradores pueden realizar el CRUD completo
4. Los empleados actualizan únicamente el stock
5. Los usuarios sólo visualizan los productos

---

## 🧠 Proceso de Desarrollo

- 🛠️ Inicio con la planificación de la base de datos y definición de roles
- 🧱 Estructura con Sequelize y configuración de middlewares
- 🔄 Implementación progresiva de rutas, controladores y modelos
- 🎨 Desarrollo del frontend con componentes reutilizables y estilos consistentes
- 🚧 Retos: errores con dependencias (`router`, `ajv`) y solución estructural
- ✅ Solución: limpieza de entorno, configuración correcta y refactor completo

---

## 💻 Instalación y ejecución

### Backend

```bash
cd backend
npm install
npx sequelize-cli db:migrate
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm start
```

---

## 📂 Estructura del proyecto

```
sistema-inventario-app/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── migrations/
│   ├── middleware/
│   └── index.js
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   └── App.js
├── README.md
```

---

## 📌 Repositorio y Anteproyecto

- El proyecto está versionado con Git
- Cada integrante debe figurar con su nombre o usuario reconocible
- El repositorio debe ser compartido con el docente

---

## 🎓 Regularización y Promoción

- Presentación grupal para regularizar
- Defensa individual para promoción, incluyendo una mejora o nueva funcionalidad

---
