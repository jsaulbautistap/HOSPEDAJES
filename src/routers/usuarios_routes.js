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
  depositarSaldo,
  recuperarPassword,
  comprobarTokenPassword,
  nuevoPassword
} from "../controllers/usuarios_controller.js";

import verificarAutenticacion from "../middlewares/autenticacion.js";
import verificarRol from "../middlewares/autenticacionRoles.js";


router.post("/registro", 
  /* #swagger.tags = ['USUARIOS']
     #swagger.description = 'Registrar un nuevo usuario'
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
  /* #swagger.tags = ['USUARIOS'] 
   #swagger.description = 'Iniciar sesión de usuario'
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
  verificarAutenticacion,
  verificarRol(['admin']),
  /* #swagger.tags = ['USUARIOS']
   #swagger.description = 'Obtener todos los usuarios (solo admins)' 
     #swagger.security = [{ "Bearer": [] }]*/
  obtenerUsuarios
);

router.put("/usuario/:id",
  verificarAutenticacion,
  /* 
    #swagger.tags = ['USUARIOS']
  #swagger.description = 'Actualizar información de un usuario'
    #swagger.security = [{ "Bearer": [] }]
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
  /* 
    #swagger.tags = ['USUARIOS']
    #swagger.description = 'Cambiar el rol del usuario autenticado'
    #swagger.security = [{ "Bearer": [] }]
    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        rol: 'anfitrion'
      }
    }
  */
  cambiarRolUsuario
);

router.get("/perfil",
  verificarAutenticacion,
  
  /*
    #swagger.tags = ['USUARIOS']
    #swagger.description = 'Obtener el perfil del usuario autenticado' 
    #swagger.security = [{ "Bearer": [] }]*/
  
  perfilUsuario
);

router.post("/perfil/foto/:id",
  verificarAutenticacion,
  
  /* 
    #swagger.tags = ['USUARIOS']
    #swagger.description = 'Subir una foto de perfil'
    #swagger.security = [{ "Bearer": [] }]
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
  /* 
    #swagger.tags = ['USUARIOS']
    #swagger.description = 'Eliminar la foto de perfil del usuario'
    #swagger.security = [{ "Bearer": [] }]
     #swagger.parameters['id'] = { in: 'path', description: 'ID del usuario', required: true }
  */
  eliminarFotoPerfil
);

router.post("/depositar/:idusuario",
  verificarAutenticacion,
  verificarRol(['huesped']),
  /* 
    #swagger.tags = ['USUARIOS']
    #swagger.description = 'Depositar saldo en cuenta del usuario'
    #swagger.security = [{ "Bearer": [] }]
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


router.post("/recuperar-password",
  /* 
    #swagger.tags = ['USUARIOS']
    #swagger.description = 'Solicitar el envío de un correo para recuperar la contraseña'
    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        $email: 'usuario@example.com'
      }
    }
  */
  recuperarPassword
);

// Ruta para comprobar token recibido por correo
router.get("/recuperar-password/:token",
  /* 
    #swagger.tags = ['USUARIOS']
    #swagger.description = 'Comprobar si el token de recuperación es válido'
    #swagger.parameters['token'] = {
      in: 'path',
      required: true,
      description: 'Token único enviado por correo'
    }
  */
  comprobarTokenPassword
);

// Ruta para guardar nueva contraseña
router.post("/recuperar-password/:token",
  /* 
    #swagger.tags = ['USUARIOS']
    #swagger.description = 'Establecer una nueva contraseña con un token válido'
    #swagger.parameters['token'] = {
      in: 'path',
      required: true,
      description: 'Token de recuperación'
    }
    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        $password: 'nuevacontraseña123'
      }
    }
  */
  nuevoPassword
);

export default router;
