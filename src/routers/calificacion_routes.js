import { Router } from "express";

import {
    crearCalificacion,
    obtenerCalificacionesDeAlojamiento
} from "../controllers/calificacion_controller.js";

import verificarAutenticacion from "../middlewares/autenticacion.js";
import verificarRol from "../middlewares/autenticacionRoles.js";

const router = Router();

router.post("/crear/:idReserva",
  verificarAutenticacion,
  verificarRol(['huesped']),
  /* 
    #swagger.tags = ['CALIFICACIONES']
    #swagger.description = 'Crear una calificación para un alojamiento asociado a una reserva completada'
    #swagger.security = [{ "Bearer": [] }]
    #swagger.parameters['idReserva'] = {
      in: 'path',
      description: 'ID de la reserva ya completada',
      required: true
    }
    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        $estrellas: 5,
        comentario: 'Muy buen alojamiento, limpio y cómodo'
      }
    }
  */
  crearCalificacion
);

router.get("/:idAlojamiento",
  verificarAutenticacion,
  /* 
    #swagger.tags = ['CALIFICACIONES']
    #swagger.description = 'Obtener todas las calificaciones de un alojamiento'
    #swagger.security = [{ "Bearer": [] }]
    #swagger.parameters['idAlojamiento'] = {
      in: 'path',
      description: 'ID del alojamiento',
      required: true
    }
  */
  obtenerCalificacionesDeAlojamiento
);

export default router;
