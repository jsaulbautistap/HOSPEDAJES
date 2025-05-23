const swaggerDocument = {
  swagger: "2.0",
  info: {
    title: "API DE SISTEMA DE HOSPEDAJES",
    description: "Este es un sistema de hospedajes para la gestion de reservas, de anfitriones y de huespedes.",
    version: "1.0.0"
  },
  host: "localhost:3000",
  basePath: "/",
  schemes: ["http", "https"],
  tags: [
    {
      name: "USUARIOS",
      description: "Operaciones relacionadas con los usuarios"
    },
    {
      name: "HOSPEDAJES",
      description: "Operaciones relacionadas con los hospedajes"
    },
    {
      name: "RESERVAS",
      description: "Operaciones relacionadas con las reservas"
    }
  ],
  paths: {
    "/api/usuarios/registro": {
      post: {
        tags: ["USUARIOS"],
        description: "Registro de un nuevo usuario",
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                nombre: { type: "string", example: "johan" },
                apellido: { type: "string", example: "liebert" },
                cedula: { type: "number", example: 1752365478 },
                email: { type: "string", example: "johan.liebert@gmail.com" },
                password: { type: "string", example: "123456" },
                telefono: { type: "number", example: 987654321 }
              },
              required: ["nombre", "apellido", "cedula", "email", "password"]
            }
          }
        ],
        responses: {
          201: { description: "Usuario creado correctamente" },
          400: { description: "Datos incompletos o email ya registrado" },
          500: { description: "Error interno del servidor" }
        }
      }
    },
    "/api/usuarios/login": {
      post: {
        tags: ["USUARIOS"],
        description: "Inicio de sesión de usuario",
        parameters: [
          {
            name: "body",
            in: "body",
            schema: {
              type: "object",
              properties: {
                email: { example: "johan.liebert@gmail.com" },
                password: { example: "123456" }
              }
            }
          }
        ],
        responses: {
          200: { description: "Inicio de sesión exitoso" },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
          403: { description: "Forbidden" },
          404: { description: "Not Found" },
          500: { description: "Internal Server Error" }
        }
      }
    },
    "/api/usuarios/usuario": {
      get: {
        tags: ["USUARIOS"],
        summary: "Obtener datos del usuario ",
        description: "Obtiene los datos de todos los usuarios",
        responses: {
          200: { description: "OK" },
          500: { description: "Internal Server Error" }
        }
      }
    },
    "/api/usuarios/usuario/{id}": {
      put: {
        tags: ["USUARIOS"],
        summary: "Actualizar datos del usuario autenticado",
        description: "Permite actualizar nombre, apellido, teléfono y url de la foto de perfil del usuario autenticado mediante JWT.",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            type: "string",
            description: "ID del usuario a actualizar"
          },
          {
            name: "Authorization",
            in: "header",
            required: true,
            type: "string",
            description: "Token JWT en formato Bearer: Bearer <token>"
          },
          {
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                nombre: { type: "string", example: "saul" },
                apellido: { type: "string", example: "baul" },
                telefono: { type: "number", example: 123456789 },
                urlFotoPerfil: { type: "string", example: "https://ejemplo.com/foto.jpg" }
              },
              required: ["nombre", "apellido", "telefono"]
            }
          }
        ],
        responses: {
          200: { description: "Datos de usuario actualizados correctamente" },
          400: { description: "Faltan campos requeridos" },
          401: { description: "Token no proporcionado o inválido" },
          404: { description: "Usuario no encontrado" },
          500: { description: "Error interno del servidor" }
        }
      }
    }
  }
};

export default swaggerDocument;
