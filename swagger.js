import swaggerAutogen from 'swagger-autogen';
import fs from 'fs';

const outputFile = './swagger-output.js';
const endpointsFiles = ['./src/server.js'];

const doc = {
  info: {
    title: 'API DE SISTEMA DE HOSPEDAJES',
    description: 'Este es un sistema de hospedajes para la gestión de reservas, de anfitriones y de huéspedes.',
    version: '1.0.0'
  },
  host: 'localhost:3000',
  schemes: ['http', 'https']
};

swaggerAutogen({ openapi: '2.0.0' })(outputFile, endpointsFiles, doc).then(() => {
  const appendExport = `\nexport default doc;\n`;
  if (!fs.readFileSync(outputFile, 'utf8').includes('export default')) {
    fs.appendFileSync(outputFile, appendExport);
  }
});
