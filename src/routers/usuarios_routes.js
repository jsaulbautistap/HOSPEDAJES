import { Router } from "express";

const router = Router();

import {
    registroUsuario,
    loginUsuario
} from "../controllers/usuarios_controller.js";




router.post("/registro", registroUsuario);
router.post("/login", loginUsuario);


export default router;

