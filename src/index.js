import app from './server.js';
import connection from './database.js';



/*
import Usuario from './models/usuarios.js';


// FUNCION PARA CREAR UN ADMINISTRADOR INICIAL
const crearAdminInicial = async () => {   // <---  SIEMPRE MANTENERLO COMENTADO
  try {
    const existeAdmin = await Usuario.findOne({ email: 'saulnike11@gmail.com' });
    if (!existeAdmin) {
      const nuevoAdmin = new Usuario({
        rol: ['admin'],
        nombre: 'Jhonatan Saúl',
        apellido: 'Bautista Pijal',
        cedula: "1751707843",
        email: 'jsaul.bautistap@gmail.com',
        telefono: "0986616710",
        estadoCuenta: 'activo',
      });

      nuevoAdmin.password = await nuevoAdmin.encryptPassword("");
      await nuevoAdmin.save();
      console.log('Administrador creado correctamente');
    } else {
      console.log(' Ya existe un administrador registrado');
    }
  } catch (error) {
    console.error('Error al crear el administrador:', error);
  }
};

*/


console.log("Host real:",process.env.HOST);

// Iniciar base de datos y luego servidor
connection().then(async () => {
  // await crearAdminInicial(); // <---  SIEMPRE MANTENERLO COMENTADO 
  app.listen(app.get('port'), () => {
    console.log("SERVIDOR OK EN RENDER - https://hospedajes-4rmu.onrender.com/");
  });
});
