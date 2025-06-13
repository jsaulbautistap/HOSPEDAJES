import { Router } from "express";
const router = Router();

import {
  registroUsuario,
  loginUsuario,
  obtenerUsuarios,
  actualizarUsuario,
  cambiarRolUsuario,
  perfilUsuario,
  subirFotoPerfil,
  crearFotoPerfil, 
  eliminarFotoPerfil,
  depositarSaldo
} from "../controllers/usuarios_controller.js";

import verificarAutenticacion from "../middlewares/autenticacion.js";
import verificarRol from "../middlewares/autenticacionRoles.js";

// #swagger.tags = ['USUARIOS']

router.post("/registro", 
  /* #swagger.description = 'Registrar un nuevo usuario'
     #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          $nombre: 'Juan',
          $apellido: 'Pérez',
          $cedula: '12345678',
          $email: 'juan@example.com',
          $password: '123456',
          $telefono: '987654321'
        }
     }
  */
  registroUsuario
);

router.post("/login", 
  /* #swagger.description = 'Iniciar sesión de usuario'
     #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          $email: 'johan.liebert@gmail.com',
          $password: '123456'
        }
     }
  */
  loginUsuario
);

router.get("/",
  /* #swagger.description = 'Obtener todos los usuarios (solo admins)' */
  obtenerUsuarios
);

router.put("/usuario/:id",
  verificarAutenticacion,
  /* #swagger.description = 'Actualizar información de un usuario'
     #swagger.parameters['id'] = { in: 'path', description: 'ID del usuario', required: true }
     #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          nombre: 'Nuevo Nombre',
          apellido: 'Nuevo Apellido',
          telefono: '000111222'
        }
     }
  */
  actualizarUsuario
);

router.put("/rol",
  verificarAutenticacion,
  /* #swagger.description = 'Cambiar el rol de un usuario'
     #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          id: 'idDelUsuario',
          nuevoRol: 'admin'
        }
     }
  */
  cambiarRolUsuario
);

router.get("/perfil",
  verificarAutenticacion,
  /* #swagger.description = 'Obtener el perfil del usuario autenticado' */
  perfilUsuario
);

router.post("/perfil/foto/:id",
  verificarAutenticacion,
  /* #swagger.description = 'Subir una foto de perfil'
     #swagger.consumes = ['multipart/form-data']
     #swagger.parameters['id'] = { in: 'path', description: 'ID del usuario', required: true }
     #swagger.parameters['foto'] = {
        in: 'formData',
        name: 'foto',
        type: 'file',
        required: true,
        description: 'Imagen de perfil'
     }
  */
  crearFotoPerfil,
  subirFotoPerfil
);

router.delete("/perfil/foto/:id",
  verificarAutenticacion,
  /* #swagger.description = 'Eliminar la foto de perfil del usuario'
     #swagger.parameters['id'] = { in: 'path', description: 'ID del usuario', required: true }
  */
  eliminarFotoPerfil
);

router.post("/depositar/:idusuario",
  verificarAutenticacion,
  verificarRol(['huesped']),
  /* #swagger.description = 'Depositar saldo en cuenta del usuario'
     #swagger.parameters['idusuario'] = { in: 'path', description: 'ID del usuario', required: true }
     #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          monto: 100
        }
     }
  */
  depositarSaldo
);

export default router;
