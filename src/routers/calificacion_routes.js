import { Router } from "express";

import {
    crearCalificacion,
    obtenerCalificacionesDeAlojamiento
} from "../controllers/calificacion_controller.js";

import verificarAutenticacion from "../middlewares/autenticacion.js";
import verificarRol from "../middlewares/autenticacionRoles.js";

const router = Router();



router.post("/crear/:idReserva", verificarAutenticacion, verificarRol(['huesped']), crearCalificacion)
router.get("/:idAlojamiento", verificarAutenticacion, obtenerCalificacionesDeAlojamiento);

export default router;