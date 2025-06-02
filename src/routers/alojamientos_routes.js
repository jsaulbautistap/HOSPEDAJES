import { Router } from "express";


import {
    crearAlojamiento,
    obtenerAlojamientos,
    obtenerAlojamientoPorId,
    actualizarAlojamiento,
    eliminarAlojamiento
} from "../controllers/alojamientos_controller.js";

// MIDLEWARES PARA RUTAS PROTEGIDAS
import verificarAutenticacion from "../middlewares/autenticacion.js";
import verificarRol from "../middlewares/autenticacionRoles.js";

const router = Router();

router.post("/crear", verificarAutenticacion,verificarRol(['anfitrion']), crearAlojamiento);
router.get("/", obtenerAlojamientos);
router.get("/ver/:id", verificarAutenticacion,verificarRol(['anfitrion']),  obtenerAlojamientoPorId);   
router.put("/actualizar/:id", verificarAutenticacion,verificarRol(['anfitrion']), actualizarAlojamiento);
router.delete("/borrar/:id",verificarAutenticacion,verificarRol(['anfitrion']), eliminarAlojamiento);

export default router;