const outputFile={
  "swagger": "2.0",
  "info": {
    "title": "API DE SISTEMA DE HOSPEDAJES",
    "description": "Este es un sistema de hospedajes para la gestión de reservas, de anfitriones y de huéspedes.",
    "version": "1.0.0"
  },
  "host": "hospedajes-4rmu.onrender.com",
  "basePath": "/",
  "tags": [
    {
      "name": "USUARIOS",
      "description": "Operaciones relacionadas con los usuarios"
    },
    {
      "name": "ALOJAMIENTOS",
      "description": "Gestión de alojamientos por parte de anfitriones"
    },
    {
      "name": "RESERVAS",
      "description": "Creación y administración de reservas por parte de huéspedes y anfitriones"
    },
    {
      "name": "FOTOS",
      "description": "Gestión de fotos de los alojamientos"
    },
    {
      "name": "PAGOS",
      "description": "Gestión de pagos de reservas"
    }
  ],
  "schemes": [
    "http"
  ],
  "securityDefinitions": {
    "Bearer": {
      "type": "apiKey",
      "name": "Authorization",
      "in": "header",
      "description": "Introduce el token en el formato: Bearer <token>"
    }
  },
  "paths": {
    "/": {
      "get": {
        "description": "",
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/usuarios/registro": {
      "post": {
        "tags": [
          "USUARIOS"
        ],
        "description": "Registrar un nuevo usuario",
        "parameters": [
          {
            "name": "body",
            "in": "body",
            "required": true,
            "schema": {
              "type": "object",
              "properties": {
                "nombre": {
                  "type": "string",
                  "example": "Juan"
                },
                "apellido": {
                  "type": "string",
                  "example": "Pérez"
                },
                "cedula": {
                  "type": "string",
                  "example": "12345678"
                },
                "email": {
                  "type": "string",
                  "example": "juan@example.com"
                },
                "password": {
                  "type": "string",
                  "example": "123456"
                },
                "telefono": {
                  "type": "string",
                  "example": "987654321"
                }
              },
              "required": [
                "nombre",
                "apellido",
                "cedula",
                "email",
                "password",
                "telefono"
              ]
            }
          }
        ],
        "responses": {
          "201": {
            "description": "Created"
          },
          "400": {
            "description": "Bad Request"
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      }
    },
    "/api/usuarios/login": {
      "post": {
        "tags": [
          "USUARIOS"
        ],
        "description": "Iniciar sesión de usuario",
        "parameters": [
          {
            "name": "body",
            "in": "body",
            "required": true,
            "schema": {
              "type": "object",
              "properties": {
                "email": {
                  "type": "string",
                  "example": "johan.liebert@gmail.com"
                },
                "password": {
                  "type": "string",
                  "example": "123456"
                }
              },
              "required": [
                "email",
                "password"
              ]
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "400": {
            "description": "Bad Request"
          },
          "401": {
            "description": "Unauthorized"
          },
          "403": {
            "description": "Forbidden"
          },
          "404": {
            "description": "Not Found"
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      }
    },
    "/api/usuarios/": {
      "get": {
        "tags": [
          "USUARIOS"
        ],
        "description": "Obtener todos los usuarios (solo admins)",
        "responses": {
          "200": {
            "description": "OK"
          },
          "500": {
            "description": "Internal Server Error"
          }
        },
        "security": [
          {
            "Bearer": []
          }
        ]
      }
    },
    "/api/usuarios/usuario/{id}": {
      "put": {
        "tags": [
          "USUARIOS"
        ],
        "description": "Actualizar información de un usuario",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string",
            "description": "ID del usuario"
          },
          {
            "name": "body",
            "in": "body",
            "required": true,
            "schema": {
              "type": "object",
              "properties": {
                "nombre": {
                  "type": "string",
                  "example": "Nuevo Nombre"
                },
                "apellido": {
                  "type": "string",
                  "example": "Nuevo Apellido"
                },
                "telefono": {
                  "type": "string",
                  "example": "000111222"
                }
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "400": {
            "description": "Bad Request"
          },
          "404": {
            "description": "Not Found"
          },
          "500": {
            "description": "Internal Server Error"
          }
        },
        "security": [
          {
            "Bearer": []
          }
        ]
      }
    },
    "/api/usuarios/rol": {
      "put": {
        "tags": [
          "USUARIOS"
        ],
        "description": "Cambiar el rol del usuario autenticado",
        "parameters": [
          {
            "name": "body",
            "in": "body",
            "required": true,
            "schema": {
              "type": "object",
              "properties": {
                "rol": {
                  "type": "string",
                  "example": "anfitrion"
                }
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "400": {
            "description": "Bad Request"
          }
        },
        "security": [
          {
            "Bearer": []
          }
        ]
      }
    },
    "/api/usuarios/perfil": {
      "get": {
        "tags": [
          "USUARIOS"
        ],
        "description": "Obtener el perfil del usuario autenticado",
        "responses": {
          "200": {
            "description": "OK"
          },
          "404": {
            "description": "Not Found"
          },
          "500": {
            "description": "Internal Server Error"
          }
        },
        "security": [
          {
            "Bearer": []
          }
        ]
      }
    },
    "/api/usuarios/perfil/foto/{id}": {
      "post": {
        "tags": [
          "USUARIOS"
        ],
        "description": "Subir una foto de perfil",
        "consumes": [
          "multipart/form-data"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string",
            "description": "ID del usuario"
          },
          {
            "name": "foto",
            "in": "formData",
            "type": "file",
            "required": true,
            "description": "Imagen de perfil"
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "404": {
            "description": "Not Found"
          },
          "500": {
            "description": "Internal Server Error"
          }
        },
        "security": [
          {
            "Bearer": []
          }
        ]
      },
      "delete": {
        "tags": [
          "USUARIOS"
        ],
        "description": "Eliminar la foto de perfil del usuario",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string",
            "description": "ID del usuario"
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "404": {
            "description": "Not Found"
          },
          "500": {
            "description": "Internal Server Error"
          }
        },
        "security": [
          {
            "Bearer": []
          }
        ]
      }
    },
    "/api/usuarios/depositar/{idusuario}": {
      "post": {
        "tags": [
          "USUARIOS"
        ],
        "description": "Depositar saldo en cuenta del usuario",
        "parameters": [
          {
            "name": "idusuario",
            "in": "path",
            "required": true,
            "type": "string",
            "description": "ID del usuario"
          },
          {
            "name": "body",
            "in": "body",
            "required": true,
            "schema": {
              "type": "object",
              "properties": {
                "monto": {
                  "type": "number",
                  "example": 100
                }
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "400": {
            "description": "Bad Request"
          },
          "404": {
            "description": "Not Found"
          },
          "500": {
            "description": "Internal Server Error"
          }
        },
        "security": [
          {
            "Bearer": []
          }
        ]
      }
    },
    "/api/usuarios/recuperar-password": {
      "post": {
        "tags": [
          "USUARIOS"
        ],
        "description": "Solicitar el envío de un correo para recuperar la contraseña",
        "parameters": [
          {
            "name": "body",
            "in": "body",
            "required": true,
            "schema": {
              "type": "object",
              "properties": {
                "email": {
                  "type": "string",
                  "example": "usuario@example.com"
                }
              },
              "required": [
                "email"
              ]
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "400": {
            "description": "Bad Request"
          },
          "404": {
            "description": "Not Found"
          }
        }
      }
    },
    "/api/usuarios/recuperar-password/{token}": {
      "get": {
        "tags": [
          "USUARIOS"
        ],
        "description": "Comprobar si el token de recuperación es válido",
        "parameters": [
          {
            "name": "token",
            "in": "path",
            "required": true,
            "type": "string",
            "description": "Token único enviado por correo"
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "400": {
            "description": "Bad Request"
          }
        }
      },
      "post": {
        "tags": [
          "USUARIOS"
        ],
        "description": "Establecer una nueva contraseña con un token válido",
        "parameters": [
          {
            "name": "token",
            "in": "path",
            "required": true,
            "type": "string",
            "description": "Token de recuperación"
          },
          {
            "name": "body",
            "in": "body",
            "required": true,
            "schema": {
              "type": "object",
              "properties": {
                "password": {
                  "type": "string",
                  "example": "nuevacontraseña123"
                }
              },
              "required": [
                "password"
              ]
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "400": {
            "description": "Bad Request"
          }
        }
      }
    },
    "/api/alojamientos/crear": {
      "post": {
        "tags": [
          "ALOJAMIENTOS"
        ],
        "description": "Crear un nuevo alojamiento (solo anfitriones)",
        "parameters": [
          {
            "name": "body",
            "in": "body",
            "required": true,
            "schema": {
              "type": "object",
              "properties": {
                "titulo": {
                  "type": "string",
                  "example": "Casa en la playa"
                },
                "descripcion": {
                  "type": "string",
                  "example": "Hermosa casa frente al mar"
                },
                "tipoAlojamiento": {
                  "type": "string",
                  "example": "casa"
                },
                "precioNoche": {
                  "type": "number",
                  "example": 150
                },
                "maxHuespedes": {
                  "type": "number",
                  "example": 4
                },
                "ciudad": {
                  "type": "string",
                  "example": "quito"
                },
                "provincia": {
                  "type": "string",
                  "example": "Pichincha"
                },
                "pais": {
                  "type": "string",
                  "example": "Ecuador"
                },
                "direccion": {
                  "type": "string",
                  "example": "Av. del Mar 123"
                }
              }
            }
          }
        ],
        "responses": {
          "201": {
            "description": "Created"
          },
          "403": {
            "description": "Forbidden"
          },
          "500": {
            "description": "Internal Server Error"
          }
        },
        "security": [
          {
            "Bearer": []
          }
        ]
      }
    },
    "/api/alojamientos/": {
      "get": {
        "tags": [
          "ALOJAMIENTOS"
        ],
        "description": "Obtener todos los alojamientos con estado activo o aplicar filtros",
        "parameters": [
          {
            "name": "provincia",
            "in": "query",
            "description": "Filtrar por provincia",
            "required": false,
            "type": "string"
          },
          {
            "name": "tipoAlojamiento",
            "in": "query",
            "description": "Filtrar por tipo de alojamiento (ej: casa, habitación, departamento)",
            "required": false,
            "type": "string"
          },
          {
            "name": "precioMin",
            "in": "query",
            "description": "Filtrar por precio mínimo por noche",
            "required": false,
            "type": "number"
          },
          {
            "name": "precioMax",
            "in": "query",
            "description": "Filtrar por precio máximo por noche",
            "required": false,
            "type": "number"
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      }
    },
    "/api/alojamientos/ver/{id}": {
      "get": {
        "tags": [
          "ALOJAMIENTOS"
        ],
        "description": "Obtener un alojamiento por ID (si está activo)",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string",
            "description": "ID del alojamiento"
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "403": {
            "description": "Forbidden"
          },
          "404": {
            "description": "Not Found"
          },
          "500": {
            "description": "Internal Server Error"
          }
        },
        "security": [
          {
            "Bearer": []
          }
        ]
      }
    },
    "/api/alojamientos/actualizar/{id}": {
      "put": {
        "tags": [
          "ALOJAMIENTOS"
        ],
        "description": "Actualizar un alojamiento (solo anfitrión dueño del alojamiento)",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string",
            "description": "ID del alojamiento"
          },
          {
            "name": "body",
            "in": "body",
            "required": true,
            "schema": {
              "type": "object",
              "properties": {
                "titulo": {
                  "type": "string",
                  "example": "Nuevo Título"
                },
                "descripcion": {
                  "type": "string",
                  "example": "Descripción actualizada"
                },
                "precioPorNoche": {
                  "type": "number",
                  "example": 200
                }
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "400": {
            "description": "Bad Request"
          },
          "403": {
            "description": "Forbidden"
          },
          "404": {
            "description": "Not Found"
          },
          "500": {
            "description": "Internal Server Error"
          }
        },
        "security": [
          {
            "Bearer": []
          }
        ]
      }
    },
    "/api/alojamientos/borrar/{id}": {
      "delete": {
        "tags": [
          "ALOJAMIENTOS"
        ],
        "description": "Eliminar un alojamiento (solo anfitrión dueño del alojamiento)",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string",
            "description": "ID del alojamiento"
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "403": {
            "description": "Forbidden"
          },
          "404": {
            "description": "Not Found"
          },
          "500": {
            "description": "Internal Server Error"
          }
        },
        "security": [
          {
            "Bearer": []
          }
        ]
      }
    },
    "/api/alojamientos/anfitrion/": {
      "get": {
        "tags": [
          "ALOJAMIENTOS"
        ],
        "description": "Obtener todos los alojamientos de un anfitrión autenticado",
        "responses": {
          "200": {
            "description": "OK"
          },
          "500": {
            "description": "Internal Server Error"
          }
        },
        "security": [
          {
            "Bearer": []
          }
        ]
      }
    },
    "/api/alojamientos/fotos/{alojamientoId}": {
      "post": {
        "tags": [
          "FOTOS"
        ],
        "description": "Subir y registrar una o varias fotos de un alojamiento (solo anfitrión)",
        "consumes": [
          "multipart/form-data"
        ],
        "parameters": [
          {
            "name": "alojamientoId",
            "in": "path",
            "required": true,
            "type": "string",
            "description": "ID del alojamiento"
          },
          {
            "name": "fotos",
            "in": "formData",
            "type": "file",
            "required": true,
            "description": "Una o más imágenes del alojamiento",
            "collectionFormat": "multi"
          }
        ],
        "responses": {
          "201": {
            "description": "Created"
          },
          "400": {
            "description": "Bad Request"
          },
          "500": {
            "description": "Internal Server Error"
          }
        },
        "security": [
          {
            "Bearer": []
          }
        ]
      },
      "get": {
        "tags": [
          "FOTOS"
        ],
        "description": "Obtener las fotos de un alojamiento específico",
        "parameters": [
          {
            "name": "alojamientoId",
            "in": "path",
            "required": true,
            "type": "string",
            "description": "ID del alojamiento"
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "500": {
            "description": "Internal Server Error"
          }
        },
        "security": [
          {
            "Bearer": []
          }
        ]
      }
    },
    "/api/alojamientos/fotos/": {
      "get": {
        "tags": [
          "FOTOS"
        ],
        "description": "Obtener todas las fotos registradas en el sistema",
        "responses": {
          "200": {
            "description": "OK"
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      }
    },
    "/api/alojamientos/fotos/{id}": {
      "put": {
        "tags": [
          "FOTOS"
        ],
        "description": "Actualizar los datos de una foto específica de alojamiento (solo anfitrión)",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string",
            "description": "ID de la foto"
          },
          {
            "name": "body",
            "in": "body",
            "required": true,
            "schema": {
              "type": "object",
              "properties": {
                "es_principal": {
                  "type": "boolean",
                  "example": true
                }
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "400": {
            "description": "Bad Request"
          },
          "404": {
            "description": "Not Found"
          },
          "500": {
            "description": "Internal Server Error"
          }
        },
        "security": [
          {
            "Bearer": []
          }
        ]
      },
      "delete": {
        "tags": [
          "FOTOS"
        ],
        "description": "Eliminar una foto específica de un alojamiento (solo anfitrión)",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string",
            "description": "ID de la foto"
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "404": {
            "description": "Not Found"
          },
          "500": {
            "description": "Internal Server Error"
          }
        },
        "security": [
          {
            "Bearer": []
          }
        ]
      }
    },
    "/api/reservas/crear": {
      "post": {
        "tags": [
          "RESERVAS"
        ],
        "description": "Crear una nueva reserva (solo para huéspedes)",
        "parameters": [
          {
            "name": "body",
            "in": "body",
            "required": true,
            "schema": {
              "type": "object",
              "properties": {
                "alojamiento": {
                  "type": "string",
                  "example": "idAlojamiento123"
                },
                "fechaCheckIn": {
                  "type": "string",
                  "example": "2025-07-01"
                },
                "fechaCheckOut": {
                  "type": "string",
                  "example": "2025-07-05"
                },
                "numeroHuespedes": {
                  "type": "number",
                  "example": 2
                },
                "precioTotal": {
                  "type": "number",
                  "example": 600
                }
              }
            }
          }
        ],
        "responses": {
          "201": {
            "description": "Created"
          },
          "403": {
            "description": "Forbidden"
          },
          "404": {
            "description": "Not Found"
          },
          "500": {
            "description": "Internal Server Error"
          }
        },
        "security": [
          {
            "Bearer": []
          }
        ]
      }
    },
    "/api/reservas/": {
      "get": {
        "tags": [
          "RESERVAS"
        ],
        "description": "Obtener todas las reservas (uso interno o admin)",
        "responses": {
          "200": {
            "description": "OK"
          },
          "500": {
            "description": "Internal Server Error"
          }
        },
        "security": [
          {
            "Bearer": []
          }
        ]
      }
    },
    "/api/reservas/huesped": {
      "get": {
        "tags": [
          "RESERVAS"
        ],
        "description": "Obtener todas las reservas del huésped autenticado",
        "responses": {
          "200": {
            "description": "OK"
          },
          "500": {
            "description": "Internal Server Error"
          }
        },
        "security": [
          {
            "Bearer": []
          }
        ]
      }
    },
    "/api/reservas/anfitrion": {
      "get": {
        "tags": [
          "RESERVAS"
        ],
        "description": "Obtener todas las reservas de alojamientos del anfitrión autenticado",
        "responses": {
          "200": {
            "description": "OK"
          },
          "500": {
            "description": "Internal Server Error"
          }
        },
        "security": [
          {
            "Bearer": []
          }
        ]
      }
    },
    "/api/reservas/ver/{id}": {
      "get": {
        "tags": [
          "RESERVAS"
        ],
        "description": "Obtener una reserva específica por ID (si pertenece al usuario autenticado)",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string",
            "description": "ID de la reserva"
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "400": {
            "description": "Bad Request"
          },
          "404": {
            "description": "Not Found"
          },
          "500": {
            "description": "Internal Server Error"
          }
        },
        "security": [
          {
            "Bearer": []
          }
        ]
      }
    },
    "/api/reservas/actualizar/{id}": {
      "put": {
        "tags": [
          "RESERVAS"
        ],
        "description": "Actualizar una reserva existente (según permisos)",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string",
            "description": "ID de la reserva"
          },
          {
            "name": "body",
            "in": "body",
            "required": true,
            "schema": {
              "type": "object",
              "properties": {
                "fechaCheckOut": {
                  "type": "string",
                  "example": "2025-07-06"
                },
                "numeroHuespedes": {
                  "type": "number",
                  "example": 3
                }
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "400": {
            "description": "Bad Request"
          },
          "403": {
            "description": "Forbidden"
          },
          "404": {
            "description": "Not Found"
          },
          "500": {
            "description": "Internal Server Error"
          }
        },
        "security": [
          {
            "Bearer": []
          }
        ]
      }
    },
    "/api/reservas/borrar/{id}": {
      "delete": {
        "tags": [
          "RESERVAS"
        ],
        "description": "Eliminar una reserva (solo el huésped que la creó puede hacerlo)",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string",
            "description": "ID de la reserva"
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "400": {
            "description": "Bad Request"
          },
          "403": {
            "description": "Forbidden"
          },
          "404": {
            "description": "Not Found"
          },
          "500": {
            "description": "Internal Server Error"
          }
        },
        "security": [
          {
            "Bearer": []
          }
        ]
      }
    },
    "/api/pagos/{reservaId}": {
      "post": {
        "tags": [
          "PAGOS"
        ],
        "description": "Realizar un pago para una reserva (solo huésped)",
        "parameters": [
          {
            "name": "reservaId",
            "in": "path",
            "required": true,
            "type": "string",
            "description": "ID de la reserva"
          }
        ],
        "responses": {
          "201": {
            "description": "Created"
          },
          "400": {
            "description": "Bad Request"
          },
          "404": {
            "description": "Not Found"
          },
          "500": {
            "description": "Internal Server Error"
          }
        },
        "security": [
          {
            "Bearer": []
          }
        ]
      },
      "get": {
        "tags": [
          "PAGOS"
        ],
        "description": "Obtener el pago correspondiente a una reserva",
        "parameters": [
          {
            "name": "reservaId",
            "in": "path",
            "required": true,
            "type": "string",
            "description": "ID de la reserva"
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "403": {
            "description": "Forbidden"
          },
          "404": {
            "description": "Not Found"
          },
          "500": {
            "description": "Internal Server Error"
          }
        },
        "security": [
          {
            "Bearer": []
          }
        ]
      }
    },
    "/api/pagos/": {
      "get": {
        "tags": [
          "PAGOS"
        ],
        "description": "Obtener todos los pagos registrados (solo admin)",
        "responses": {
          "200": {
            "description": "OK"
          },
          "500": {
            "description": "Internal Server Error"
          }
        },
        "security": [
          {
            "Bearer": []
          }
        ]
      }
    },
    "/api/pagos/anfitrion/saldo": {
      "get": {
        "tags": [
          "PAGOS"
        ],
        "description": "Obtener el saldo acumulado del anfitrión autenticado",
        "responses": {
          "200": {
            "description": "OK"
          },
          "500": {
            "description": "Internal Server Error"
          }
        },
        "security": [
          {
            "Bearer": []
          }
        ]
      }
    },
    "/api/pagos/huesped/pagos": {
      "get": {
        "tags": [
          "PAGOS"
        ],
        "description": "Obtener los pagos realizados por el huésped autenticado",
        "responses": {
          "200": {
            "description": "OK"
          },
          "500": {
            "description": "Internal Server Error"
          }
        },
        "security": [
          {
            "Bearer": []
          }
        ]
      }
    },
    "/api/reportes/crear": {
      "post": {
        "tags": [
          "REPORTES"
        ],
        "description": "Crear un nuevo reporte sobre un usuario o alojamiento",
        "parameters": [
          {
            "name": "body",
            "in": "body",
            "required": true,
            "schema": {
              "type": "object",
              "properties": {
                "tipoReportado": {
                  "type": "string",
                  "example": "usuario"
                },
                "idReportado": {
                  "type": "string",
                  "example": "665c8308e7e2aaf84523b5e1"
                },
                "motivo": {
                  "type": "string",
                  "example": "Comportamiento inapropiado"
                }
              }
            }
          }
        ],
        "responses": {
          "201": {
            "description": "Created"
          },
          "404": {
            "description": "Not Found"
          },
          "500": {
            "description": "Internal Server Error"
          }
        },
        "security": [
          {
            "Bearer": []
          }
        ]
      }
    },
    "/api/reportes/": {
      "get": {
        "tags": [
          "REPORTES"
        ],
        "description": "Ver todos los reportes del sistema (solo admin)",
        "parameters": [
          {
            "name": "tipo",
            "in": "query",
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "500": {
            "description": "Internal Server Error"
          }
        },
        "security": [
          {
            "Bearer": []
          }
        ]
      }
    },
    "/api/reportes/usuario": {
      "get": {
        "tags": [
          "REPORTES"
        ],
        "description": "Ver todos los reportes que ha realizado el usuario autenticado",
        "responses": {
          "200": {
            "description": "OK"
          },
          "500": {
            "description": "Internal Server Error"
          }
        },
        "security": [
          {
            "Bearer": []
          }
        ]
      }
    },
    "/api/reportes/estado/{reporteId}": {
      "put": {
        "tags": [
          "REPORTES"
        ],
        "description": "Cambiar el estado de un reporte (solo admin)",
        "parameters": [
          {
            "name": "reporteId",
            "in": "path",
            "required": true,
            "type": "string",
            "description": "ID del reporte"
          },
          {
            "name": "body",
            "in": "body",
            "required": true,
            "schema": {
              "type": "object",
              "properties": {
                "estado": {
                  "type": "string",
                  "example": "revisado"
                }
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "404": {
            "description": "Not Found"
          },
          "500": {
            "description": "Internal Server Error"
          }
        },
        "security": [
          {
            "Bearer": []
          }
        ]
      }
    },
    "/api/calificacion/crear/{idReserva}": {
      "post": {
        "description": "",
        "parameters": [
          {
            "name": "idReserva",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "body",
            "in": "body",
            "schema": {
              "type": "object",
              "properties": {
                "estrellas": {
                  "example": "any"
                },
                "comentario": {
                  "example": "any"
                }
              }
            }
          }
        ],
        "responses": {
          "201": {
            "description": "Created"
          },
          "400": {
            "description": "Bad Request"
          },
          "403": {
            "description": "Forbidden"
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      }
    },
    "/api/calificacion/{idAlojamiento}": {
      "get": {
        "description": "",
        "parameters": [
          {
            "name": "idAlojamiento",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      }
    }
  }
}

export default outputFile;