import swaggerAutogen from 'swagger-autogen';
import fs from 'fs';

const outputFile = './swagger-output.js';
const endpointsFiles = ['./src/server.js'];

const doc = {
  swagger: '2.0',
  info: {
    title: 'API DE SISTEMA DE HOSPEDAJES',
    description: 'Este es un sistema de hospedajes para la gestión de reservas, de anfitriones y de huéspedes.',
    version: '1.0.0'
  },
  host: 'hospedajes-4rmu.onrender.com', 
  schemes: ['https'], 
  tags: [
    {
      name: 'USUARIOS',
      description: 'Operaciones relacionadas con los usuarios'
    },
    {
      name: 'ALOJAMIENTOS',
      description: 'Gestión de alojamientos por parte de anfitriones'
    },
    {
      name: 'RESERVAS',
      description: 'Creación y administración de reservas por parte de huéspedes y anfitriones'
    },
    {
      name: 'FOTOS',
      description: 'Gestión de fotos de los alojamientos'
    },
    {
      name: 'PAGOS',
      description: 'Gestión de pagos de reservas'
    },{
      name: 'CALIFICACIONES',
      description: 'Sistema de calificaciones y comentarios para alojamientos' 
    }
  ],
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'Introduce el token en el formato: Bearer <token>'
    }
  }
};


swaggerAutogen(outputFile, endpointsFiles, doc);

const appendExport = `\nexport default doc;\n`;
if (!fs.readFileSync(outputFile, 'utf8').includes('export default')) {
  fs.appendFileSync(outputFile, appendExport);
}
