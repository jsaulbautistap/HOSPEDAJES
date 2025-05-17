import { Router } from "express";

const router = Router();

import {
    registroUsuario,
    loginUsuario,
    obtenerUsuarios
} from "../controllers/usuarios_controller.js";




router.post("/registro", registroUsuario);
router.post("/login", loginUsuario);
router.get("/obtener-usuario", obtenerUsuarios)


export default router;

