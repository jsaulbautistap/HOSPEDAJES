import {Router } from 'express';


import {
    crearReporte,
    verTodosLosReportes,
    verMisReportes,
    cambiarEstadoReporte
} from '../controllers/reportes_controller.js';

import verificarAutenticacion from '../middlewares/autenticacion.js';
import verificarRol from '../middlewares/autenticacionRoles.js';

const router = Router();

router.post('/crear', verificarAutenticacion, verificarRol(['huesped', 'anfitrion']), crearReporte);
router.get('/', verificarAutenticacion, verificarRol(['admin']), verTodosLosReportes);
router.get('/usuario', verificarAutenticacion, verificarRol(['huesped', 'anfitrion']), verMisReportes);
router.put('/estado/:reporteId', verificarAutenticacion, verificarRol(['admin']), cambiarEstadoReporte);


export default router;