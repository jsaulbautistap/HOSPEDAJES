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
  host: process.env.HOST || 'localhost:3000',
  schemes: ['https'],
};


swaggerAutogen(outputFile, endpointsFiles, doc);
const appendExport = `\nexport default doc;\n`;
if (!fs.readFileSync(outputFile, 'utf8').includes('export default')) {
  fs.appendFileSync(outputFile, appendExport);
}


