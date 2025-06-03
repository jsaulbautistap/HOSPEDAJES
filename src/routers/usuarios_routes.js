import { Router } from "express";

const router = Router();

import {
    registroUsuario,
    loginUsuario,
    obtenerUsuarios,
    actualizarUsuario,
    cambiarRolUsuario,
    perfilUsuario
} from "../controllers/usuarios_controller.js";
import verificarAutenticacion from "../middlewares/autenticacion.js";




router.post("/registro", registroUsuario);
router.post("/login", loginUsuario);
router.get("/", obtenerUsuarios)
router.put("/usuario/:id",verificarAutenticacion, actualizarUsuario)
router.put("/rol", verificarAutenticacion, cambiarRolUsuario)
router.get("/perfil", verificarAutenticacion, perfilUsuario);

export default router;



