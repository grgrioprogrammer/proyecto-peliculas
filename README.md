# Proyecto Películas (Biblioteca de Libros)

## Descripción
Aplicación fullstack para gestionar una biblioteca personal de libros. Permite a los usuarios registrarse, autenticarse, agregar libros, marcarlos como leídos, eliminarlos y editar su perfil. Incluye rutas protegidas y autenticación JWT.

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

## Endpoints principales (Backend)
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

## Notas y recomendaciones
- Usa Postman o Thunder Client para probar los endpoints.
- El frontend se desarrolla en la carpeta `/frontend` (crear más adelante).
- Sigue buenas prácticas de seguridad: nunca subas tu archivo `.env` a repositorios públicos.
- Si tienes problemas con dependencias, ejecuta `npm install` tras cambiar de versión de Node.

---

¿Listo para continuar con el frontend? Si necesitas más detalles para el backend, ¡avísame!