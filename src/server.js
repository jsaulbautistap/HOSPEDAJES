// Requerir los módulos
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';

// Inicializaciones
dotenv.config()
const app = express()

// Importar las rutas
import usuariosRoutes from './routers/usuarios_routes.js'
import alojamientosRoutes from './routers/alojamientos_routes.js'
import fotosAlojamientosRoutes from './routers/fotosAlojamientos_routes.js'
import reservasRoutes from './routers/reservas_routes.js'; // Si tienes reservas, de lo contrario, puedes eliminar esta línea


// SWAGGER
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger-output.js';  


app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Configuraciones 
app.set('port',process.env.port || 3000)
app.use(cors())

// Middlewares 
app.use(express.json())




// RUTAS 
app.get('/', (req, res) => {
  res.send("API de HOSPEDAJES corriendo correctamente (❁´◡`❁)");
});

app.use('/api/usuarios', usuariosRoutes);
app.use('/api/alojamientos', alojamientosRoutes);
app.use('/api/alojamientos/fotos', fotosAlojamientosRoutes); 
app.use('/api/reservas', reservasRoutes)

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ msg: "Ruta no encontrada" });
});


export default  app