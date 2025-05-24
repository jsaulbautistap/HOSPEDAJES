import swaggerAutogen from 'swagger-autogen';


const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/server.js'];
const doc = {
    info: {
        title: 'API DE SISTEMA DE HOSPEDAJES',
        description: 'Este es un sistema de hospedajes para la gestion de reservas, de anfitriones y de huespedes.',
    },
    host: 'localhost:3000',
    schemes: ['http','https']
}

swaggerAutogen()(outputFile, endpointsFiles, doc)