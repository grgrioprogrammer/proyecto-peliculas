# Proyecto Películas (Biblioteca de Libros)

## Descripción
Aplicación fullstack para gestionar una biblioteca personal de libros. Permite a los usuarios registrarse, autenticarse, iniciar sesion, agregar libros, marcarlos como leídos, eliminarlos y editar su perfil, cambiar su nombre, email o contraseña (opcional). 

Incluye rutas protegidas y autenticación JWT.

## ------------------------------- BACKEND -------------------------------

## Tecnologías utilizadas
- **Backend:** Node.js (v20+), Express, MongoDB Atlas, Mongoose, JWT, bcryptjs, dotenv, cors, nodemon
- **Frontend:** React (v18+)

## Requisitos previos
- Node.js v20 o superior
- npm v8 o superior
- Cuenta gratuita en MongoDB Atlas

## Instalación y ejecución (Backend)
1. Clona el repositorio y entra en la carpeta del proyecto:
   ```sh
   git clone <repo-url>
   cd proyecto-peliculas
   ```
2. Instala las dependencias:
   ```sh
   npm install
   ```
3. Crea un archivo `.env` en la raíz con el siguiente contenido:
   ```env
   MONGODB_URI=tu_string_de_conexion_de_mongodb_atlas
   PORT=4000
   JWT_SECRET=tu_secreto_seguro
   ```
4. Inicia el servidor en modo desarrollo:
   ```sh
   npx nodemon src/index.js
   ```

## Instalación y ejecución (Frontend)
1. Entra a la carpeta del frontend:
   ```sh
   cd frontend
   ```
2. Instala las dependencias:
   ```sh
   npm install
   ```
3. Inicia la aplicación en modo desarrollo:
   ```sh
   npm run dev
   ```
   Esto abrirá la app en `http://localhost:5173` (o el puerto que indique la terminal).

## Endpoints principales (Backend)
Para hacer pruebas en Postman utiliza:

- **Auth:**
  - POST `/api/auth/register` — Registro de usuario
  - POST `/api/auth/login` — Login de usuario
- **Libros:**
  - GET `/api/books` — Listar libros del usuario
  - POST `/api/books` — Agregar libro
  - PATCH `/api/books/:id/read` — Marcar como leído
  - DELETE `/api/books/:id` — Eliminar libro
- **Usuario:**
  - GET `/api/user/profile` — Ver perfil
  - PUT `/api/user/profile` — Editar perfil

> Todas las rutas de libros y usuario requieren autenticación (token JWT en el header Authorization).

## ------------------------------- FRONTEND -------------------------------

## Tecnologías utilizadas en el frontend
- **React 18+** (con Vite para desarrollo rápido y moderno)
- **React Router DOM** (ruteo y rutas protegidas)
- **Context API** (gestión global de autenticación)
- **CSS moderno y responsivo** (paleta cálida tipo Netflix, editable en `frontend/src/index.css`)

## Estructura y personalización de estilos
- Los estilos globales y la paleta de colores se encuentran en el archivo:
  - `frontend/src/index.css`
- Puedes modificar colores, fuentes, tamaños y responsividad desde ese archivo para personalizar la apariencia.
- El layout principal y la navbar están en `frontend/src/App.jsx`.
- Los componentes reutilizables (como la lista de libros) están en `frontend/src/components/`.

## Notas adicionales
- El frontend se comunica con el backend en `http://localhost:4000` por defecto. Si cambias el puerto del backend, actualiza las URLs en los archivos del frontend.
- Para producción, deberás construir el frontend con `npm run build` y servir los archivos estáticos resultantes.
- Si necesitas agregar más páginas o componentes, sigue la estructura de carpetas en `frontend/src/`.
- Usa Postman o Thunder Client para probar los endpoints.
- Sigue buenas prácticas de seguridad: nunca subas tu archivo `.env` a repositorios públicos.
- Si tienes problemas con dependencias, ejecuta `npm install` tras cambiar de versión de Node.

---
