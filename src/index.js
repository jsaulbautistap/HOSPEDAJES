import app from './server.js';
import connection from './database.js';



console.log("Host real:",process.env.HOST);

// Iniciar base de datos y luego servidor
connection().then(async () => {
  app.listen(app.get('port'), () => {
    console.log("SERVIDOR OK EN RENDER - https://hospedajes-4rmu.onrender.com/");
  });
});
