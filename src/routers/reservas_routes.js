import { Router } from "express";
import {
  crearReserva,
  obtenerReservas,
  obtenerMisReservas,
  obtenerReservasAnfitrion,
  obtenerReservaPorId,
  actualizarReserva,
  eliminarReserva
} from "../controllers/reservas_controller.js";

import verificarAutenticacion from "../middlewares/autenticacion.js";
import verificarRol from "../middlewares/autenticacionRoles.js";

const router = Router();

router.post("/crear",
  verificarAutenticacion,
  verificarRol(["huesped"]),
  /* 
    #swagger.tags = ['RESERVAS']
    #swagger.description = 'Crear una nueva reserva (solo para huéspedes)'
    #swagger.security = [{ "Bearer": [] }]
    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        alojamiento: "idAlojamiento123",
        fechaCheckIn: "2025-07-01",
        fechaCheckOut: "2025-07-05",
        numeroHuespedes: 2,
        precioTotal: 600
      }
    }
  */
  crearReserva
);

router.get("/",
  verificarAutenticacion,
  verificarRol(["admin"]),
  /* 
    #swagger.tags = ['RESERVAS']
    #swagger.security = [{ "Bearer": [] }]
    #swagger.description = 'Obtener todas las reservas (uso interno o admin)'
  */
  obtenerReservas
);

router.get("/huesped",
  verificarAutenticacion,
  verificarRol(["huesped"]),
  /* 
    #swagger.tags = ['RESERVAS']
    #swagger.description = 'Obtener todas las reservas del huésped autenticado'
    #swagger.security = [{ "Bearer": [] }]
  */
  obtenerMisReservas
);

router.get("/anfitrion",
  verificarAutenticacion,
  verificarRol(["anfitrion"]),
  /* 
    #swagger.tags = ['RESERVAS']
    #swagger.description = 'Obtener todas las reservas de alojamientos del anfitrión autenticado'
    #swagger.security = [{ "Bearer": [] }]
  */
  obtenerReservasAnfitrion
);

router.get("/ver/:id",
  verificarAutenticacion,
  verificarRol(["huesped", "anfitrion"]),
  /* 
    #swagger.tags = ['RESERVAS']
    #swagger.description = 'Obtener una reserva específica por ID (si pertenece al usuario autenticado)'
    #swagger.security = [{ "Bearer": [] }]    
    #swagger.parameters['id'] = { in: 'path', required: true, description: 'ID de la reserva' }
  */
  obtenerReservaPorId
);

router.put("/actualizar/:id",
  verificarAutenticacion,
  verificarRol(["huesped"]),
  /* 
    #swagger.tags = ['RESERVAS']
    #swagger.description = 'Actualizar una reserva existente (según permisos)'
    #swagger.security = [{ "Bearer": [] }]
    #swagger.parameters['id'] = { in: 'path', required: true, description: 'ID de la reserva' }
    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        fechaCheckOut: "2025-07-06",
        numeroHuespedes: 3
      }
    }
  */
  actualizarReserva
);

router.delete("/borrar/:id",
  verificarAutenticacion,
  verificarRol(["huesped"]),
  /* 
    #swagger.tags = ['RESERVAS']
    #swagger.description = 'Eliminar una reserva (solo el huésped que la creó puede hacerlo)'
    #swagger.security = [{ "Bearer": [] }]
    #swagger.parameters['id'] = { in: 'path', required: true, description: 'ID de la reserva' }
  */
  eliminarReserva
);

export default router;
