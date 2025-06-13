import { Router } from "express";

import {
  crearAlojamiento,
  obtenerAlojamientos,
  obtenerAlojamientoPorId,
  actualizarAlojamiento,
  eliminarAlojamiento,
  obtenerAlojamientosAnfitrion
} from "../controllers/alojamientos_controller.js";

import verificarAutenticacion from "../middlewares/autenticacion.js";
import verificarRol from "../middlewares/autenticacionRoles.js";

const router = Router();

router.post("/crear",
  verificarAutenticacion,
  verificarRol(['anfitrion']),
  /* 
    #swagger.tags = ['ALOJAMIENTOS']
    #swagger.description = 'Crear un nuevo alojamiento (solo anfitriones)'
    #swagger.security = [{ "Bearer": [] }]
    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        titulo: "Casa en la playa",
        descripcion: "Hermosa casa frente al mar",
        tipoAlojamiento: "casa",
        precioNoche: 150,
        maxHuespedes: 4,
        ciudad:"quito",
        provincia: "Pichincha",
        pais: "Ecuador",
        direccion: "Av. del Mar 123",
      }
    }
  */
  crearAlojamiento
);

router.get("/",
  /* 
    #swagger.tags = ['ALOJAMIENTOS']
    #swagger.description = 'Obtener todos los alojamientos con estado activo' 
  */
  obtenerAlojamientos
);

router.get("/ver/:id",
  verificarAutenticacion,
  verificarRol(['anfitrion', 'huesped']),
  /* 
    #swagger.tags = ['ALOJAMIENTOS']
    #swagger.description = 'Obtener un alojamiento por ID (si está activo)'
    #swagger.security = [{ "Bearer": [] }]
    #swagger.parameters['id'] = { in: 'path', required: true, description: 'ID del alojamiento' }
  */
  obtenerAlojamientoPorId
);

router.put("/actualizar/:id",
  verificarAutenticacion,
  verificarRol(['anfitrion']),
  /* 
    #swagger.tags = ['ALOJAMIENTOS']
    #swagger.description = 'Actualizar un alojamiento (solo anfitrión dueño del alojamiento)'
    #swagger.security = [{ "Bearer": [] }]
    #swagger.parameters['id'] = { in: 'path', required: true, description: 'ID del alojamiento' }
    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        titulo: "Nuevo Título",
        descripcion: "Descripción actualizada",
        precioPorNoche: 200
      }
    }
  */
  actualizarAlojamiento
);

router.delete("/borrar/:id",
  verificarAutenticacion,
  verificarRol(['anfitrion']),
  /* 
    #swagger.tags = ['ALOJAMIENTOS']
    #swagger.description = 'Eliminar un alojamiento (solo anfitrión dueño del alojamiento)'
    #swagger.security = [{ "Bearer": [] }]
    #swagger.parameters['id'] = { in: 'path', required: true, description: 'ID del alojamiento' }
  */
  eliminarAlojamiento
);

router.get("/anfitrion/",
  verificarAutenticacion,
  verificarRol(['anfitrion']),
  /* 
    #swagger.tags = ['ALOJAMIENTOS']
    #swagger.description = 'Obtener todos los alojamientos de un anfitrión autenticado'
    #swagger.security = [{ "Bearer": [] }]
  */
  obtenerAlojamientosAnfitrion
);

export default router;
