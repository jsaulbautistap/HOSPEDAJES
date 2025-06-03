
 const swaggerDocument = {
  swagger: "2.0",
  info: {
    title: "API DE SISTEMA DE HOSPEDAJES",
    description: "Este es un sistema de hospedajes para la gestion de reservas, de anfitriones y de huespedes.",
    version: "1.0.0"
  },
  host: 'hospedajes-4rmu.onrender.com',
  basePath: "/",
  schemes: ['https'],
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
    "/api/usuarios/": {
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
    },
    "/api/alojamientos/crear": {
      post: {
        tags: ["HOSPEDAJES"],
        summary: "Crear un nuevo alojamiento",
        description: "Crea un nuevo alojamiento para un anfitrión autenticado. Requiere autenticación mediante token JWT.",
        parameters: [
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
                titulo: { type: "string", example: "Paraiso turistico!!" },
                descripcion: { type: "string", example: "Este lugar es muy bonito" },
                tipoAlojamiento: { type: "string", example: "cabaña" },
                precioNoche: { type: "number", example: 20 },
                maxHuespedes: { type: "number", example: 4 },
                ciudad: { type: "string", example: "quito" },
                provincia: { type: "string", example: "pichincha" },
                pais: { type: "string", example: "Ecuador" },
                direccion: { type: "string", example: "calle rocafuerte y si" }
              },
              required: ["titulo", "descripcion", "tipoAlojamiento", "precioNoche", "maxHuespedes", "ciudad", "provincia", "pais", "direccion"]
            }
          }
        ],
        responses: {
          201: { description: "Alojamiento creado correctamente" },
          400: { description: "Faltan datos requeridos" },
          401: { description: "Token no proporcionado o inválido" },
          500: { description: "Error interno del servidor" }
        }
      }
    },
    "/api/alojamientos": {
      get: {
        tags: ["HOSPEDAJES"],
        summary: "Obtener todos los alojamientos",
        description: "Obtiene todos los alojamientos registrados en el sistema",
        responses: {
          200: { description: "Lista de alojamientos obtenida correctamente" },
          500: { description: "Error al obtener los alojamientos" }
        }
      }
    },
    "/api/alojamientos/{id}": {
      get: {
        tags: ["HOSPEDAJES"],
        summary: "Obtener un alojamiento por ID",
        description: "Devuelve los datos de un alojamiento específico",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            type: "string",
            description: "ID del alojamiento a consultar"
          }
        ],
        responses: {
          200: { description: "Alojamiento encontrado" },
          404: { description: "Alojamiento no encontrado" },
          500: { description: "Error al buscar el alojamiento" }
        }
      },
      put: {
        tags: ["HOSPEDAJES"],
        summary: "Actualizar un alojamiento",
        description: "Actualiza los datos de un alojamiento si el usuario es el anfitrión propietario",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            type: "string",
            description: "ID del alojamiento a actualizar"
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
                titulo: { type: "string" },
                descripcion: { type: "string" },
                tipoAlojamiento: { type: "string" },
                precioNoche: { type: "number" },
                maxHuespedes: { type: "number" },
                ciudad: { type: "string" },
                provincia: { type: "string" },
                pais: { type: "string" },
                direccion: { type: "string" }
              }
            }
          }
        ],
        responses: {
          200: { description: "Alojamiento actualizado correctamente" },
          400: { description: "Faltan campos requeridos" },
          403: { description: "No autorizado para modificar este alojamiento" },
          404: { description: "Alojamiento no encontrado" },
          500: { description: "Error al actualizar el alojamiento" }
        }
      },
      delete: {
        tags: ["HOSPEDAJES"],
        summary: "Eliminar un alojamiento",
        description: "Elimina un alojamiento si el usuario autenticado es su propietario",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            type: "string",
            description: "ID del alojamiento a eliminar"
          },
          {
            name: "Authorization",
            in: "header",
            required: true,
            type: "string",
            description: "Token JWT en formato Bearer: Bearer <token>"
          }
        ],
        responses: {
          200: { description: "Alojamiento eliminado exitosamente" },
          403: { description: "No autorizado para eliminar este alojamiento" },
          404: { description: "Alojamiento no encontrado" },
          500: { description: "Error al eliminar el alojamiento" }
        }
      }
    },

    "/api/alojamientos/fotos/{alojamientoId}": {
      post: {
        tags: ["HOSPEDAJES"],
        summary: "Subir fotos a un alojamiento",
        description: "Sube una o varias imágenes para un alojamiento especificado. Requiere autenticación mediante token JWT.",
        consumes: ["multipart/form-data"],
        parameters: [
          {
            name: "alojamientoId",
            in: "path",
            required: true,
            type: "string",
            description: "ID del alojamiento al que se subirán las fotos"
          },
          {
            name: "Authorization",
            in: "header",
            required: true,
            type: "string",
            description: "Token JWT en formato Bearer: Bearer <token>"
          },
          {
            name: "imagenes",
            in: "formData",
            required: true,
            type: "file",
            description: "Archivos de imagen para subir",
            collectionFormat: "multi"
          }
        ],
        responses: {
          201: { description: "Fotos subidas correctamente" },
          400: { description: "No se subieron imágenes" },
          401: { description: "Token no proporcionado o inválido" },
          500: { description: "Error al subir fotos" }
        }
      },
      get: {
        tags: ["HOSPEDAJES"],
        summary: "Obtener todas las fotos de un alojamiento",
        description: "Retorna una lista de todas las fotos asociadas a un alojamiento",
        parameters: [
          {
            name: "alojamientoId",
            in: "path",
            required: true,
            type: "string"
          }
        ],
        responses: {
          200: { description: "Lista de fotos del alojamiento" },
          404: { description: "Alojamiento o fotos no encontrados" },
          500: { description: "Error del servidor" }
        }
      }
    },
    "/api/alojamientos/fotos/{fotoId}": {
      delete: {
        tags: ["HOSPEDAJES"],
        summary: "Eliminar una foto de alojamiento",
        description: "Elimina una foto especificada por su ID. Requiere autenticación mediante token JWT.",
        parameters: [
          {
            name: "fotoId",
            in: "path",
            required: true,
            type: "string"
          },
          {
            name: "Authorization",  
            in: "header",
            required: true,
            type: "string",
            description: "Token JWT en formato Bearer: Bearer <token>"
          }
        ],
        responses: {
          200: { description: "Foto eliminada correctamente" },
          404: { description: "Foto no encontrada" },
          500: { description: "Error al eliminar la foto" }
        }
      },
      put: {
        tags: ["HOSPEDAJES"],
        summary: "Actualizar una foto de alojamiento",
        description: "Reemplaza una foto existente por una nueva. Requiere autenticación mediante token JWT.",
        consumes: ["multipart/form-data"],
        parameters: [
          {
            name: "fotoId",
            in: "path",
            required: true,
            type: "string"
          },
          {
            name: "Authorization",
            in: "header",
            required: true,
            type: "string",
            description: "Token JWT en formato Bearer: Bearer <token>"
          },
          {
            name: "imagen",
            in: "formData",
            required: true,
            type: "file",
            description: "Nueva imagen que reemplazará la anterior"
          }
        ],
        responses: {
          200: { description: "Foto actualizada correctamente" },
          404: { description: "Foto no encontrada" },
          500: { description: "Error al actualizar la foto" }
        }
      }
    }
  }
};

export default swaggerDocument;