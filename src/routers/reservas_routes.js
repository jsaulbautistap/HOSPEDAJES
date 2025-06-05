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

router.post("/crear", verificarAutenticacion, verificarRol(["huesped"]), crearReserva);
router.get("/", obtenerReservas);
router.get("/huesped", verificarAutenticacion, verificarRol(["huesped"]), obtenerMisReservas);
router.get("/anfitrion", verificarAutenticacion, verificarRol(["anfitrion"]), obtenerReservasAnfitrion);
router.get("/ver/:id", verificarAutenticacion, verificarRol(["huesped", "anfitrion"]), obtenerReservaPorId);
router.put("/actualizar/:id", verificarAutenticacion, verificarRol(["huesped", "anfitrion"]), actualizarReserva);
router.delete("/borrar/:id", verificarAutenticacion, verificarRol(["huesped"]), eliminarReserva);



export default router;
