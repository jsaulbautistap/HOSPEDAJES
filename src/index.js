import app from './server.js';
import connection from './database.js';

// Importar librerías necesarias para crear al administrador
import Usuario from './models/usuarios.js';

// Función para crear el administrador
/*
//const crearAdminInicial = async () => {   // <---  SIEMPRE MANTENERLO COMENTADO
  try {
    const existeAdmin = await Usuario.findOne({ email: 'saulnike11@gmail.com' });
    if (!existeAdmin) {
      const nuevoAdmin = new Usuario({
        rol: ['admin'],
        nombre: 'Jhonatan Saúl',
        apellido: 'Bautista Pijal',
        cedula:1751707843,
        email: 'saulnike11@gmail.com',
        password: "",
        telefono: "0986616710"
      });

      nuevoAdmin.password = await nuevoAdmin.encryptPassword("adminsaulpsw");
      await nuevoAdmin.save();
      console.log('Administrador creado correctamente');
    } else {
      console.log(' Ya existe un administrador registrado');
    }
  } catch (error) {
    console.error('Error al crear el administrador:', error);
  }
  */
//};

// Iniciar base de datos y luego servidor
connection().then(async () => {
  //await crearAdminInicial(); // <---  SIEMPRE MANTENERLO COMENTADO 
  app.listen(app.get('port'), () => {
    console.log("✅ SERVIDOR OK EN RENDER - https://hospedajes-4rmu.onrender.com/");
  });
});
