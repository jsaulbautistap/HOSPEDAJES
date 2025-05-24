import { Router } from "express";


import {
    crearAlojamiento,
    obtenerAlojamientos,
    obtenerAlojamientoPorId,
    actualizarAlojamiento,
    eliminarAlojamiento
} from "../controllers/alojamientos_controller.js";

import verificarAutenticacion from "../middlewares/autenticacion.js";
import verificarRol from "../middlewares/autenticacionRoles.js";

const router = Router();

router.post("/crear", verificarAutenticacion, crearAlojamiento);
router.get("/", obtenerAlojamientos);
router.get("/ver/:id", verificarAutenticacion, obtenerAlojamientoPorId);   
router.put("/actualizar/:id", verificarAutenticacion, actualizarAlojamiento);
router.delete("/borrar/:id",verificarAutenticacion, eliminarAlojamiento);

export default router;