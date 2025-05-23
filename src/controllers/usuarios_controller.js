import mongoose from "mongoose";

import Usuario from "../models/usuarios.js";
import generarJWT  from "../helpers/generarJWT.js";

const registroUsuario = async (req, res) => {
  const { email, password } = req.body;

   try {

    // Valida que los datos estén completos
    if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos obligatorios" });
    // validar el tamaño de la contraseña
    if(password.length < 6) return res.status(400).json({ msg: "Lo sentimos, la contraseña debe tener al menos 6 caracteres" })
    // Verificar si el email ya existe
    const verificarEmailBDD = await Usuario.findOne({ email });
    if (verificarEmailBDD) return res.status(400).json({ msg: "Lo sentimos, el email ya se encuentra registrado" });
    // Crear nueva instancia del usuario con los datos del body
    const nuevoUsuario = new Usuario(req.body);

    // Encriptar la contraseña
    nuevoUsuario.password = await nuevoUsuario.encryptPassword(password);
    // Guardar usuario en la base de datos
    await nuevoUsuario.save();
    res.status(201).json({ msg: "Usuario registrado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Hubo un error al registrar el usuario. Intenta nuevamente." });
  }
};



const loginUsuario = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validar campos vacíos
    if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" });

    // Buscar al usuario por email
    const usuarioBDD = await Usuario.findOne({ email }).select("-__v -createdAt -updatedAt");
    if (!usuarioBDD) return res.status(404).json({ msg: "Lo sentimos, el usuario no se encuentra registrado" });

    // Verificar estado de cuenta
    if (usuarioBDD.estadoCuenta !== 'activo') return res.status(403).json({ msg: `Cuenta ${usuarioBDD.estadoCuenta}. Comunicate con Soporte, para más información` });

    // Verificar contraseña
    const verificarPassword = await usuarioBDD.matchPassword(password);
    if (!verificarPassword) return res.status(401).json({ msg: "Lo sentimos, el password no es el correcto" });

    // Generar token con el rol actual
    const token = generarJWT(usuarioBDD._id, usuarioBDD.rol);

    // Extraer campos deseados para la respuesta
    const { _id, nombre, apellido, cedula, telefono, email: emailUsuario, rol, urlFotoPerfil, estadoCuenta, saldoAnfitrion } = usuarioBDD;

    res.status(200).json({
      token,
      _id,
      nombre,
      apellido,
      cedula,
      telefono,
      email: emailUsuario,
      rol,
      urlFotoPerfil,
      estadoCuenta,
      saldoAnfitrion
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al intentar iniciar sesión" });
  }
}


const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find({}, "nombre email -_id"); 
    res.status(200).json(usuarios);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ msg: "Error al obtener los usuarios" });
  }
};



const actualizarUsuario = async (req, res) => {
  const { id } = req.params;

  // Validar formato de ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: "Lo sentimos, debe ser un ID válido" });
  }

  // Validar que no haya campos vacíos
  if (Object.values(req.body).includes("")) {
    return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" });
  }

  try {
    // Buscar usuario por ID
    const usuarioBDD = await Usuario.findById(id);
    if (!usuarioBDD) {
      return res.status(404).json({ msg: `Lo sentimos, no existe el usuario con ID ${id}` });
    }

    // Verificar si el email está siendo modificado y ya existe en otro usuario
    if (usuarioBDD.email !== req.body.email) {
      const usuarioExistente = await Usuario.findOne({ email: req.body.email });
      if (usuarioExistente) {
        return res.status(400).json({ msg: "Lo sentimos, ese email ya se encuentra registrado" });
      }
    }

    // Actualizar campos
    usuarioBDD.nombre = req.body.nombre || usuarioBDD.nombre;
    usuarioBDD.apellido = req.body.apellido || usuarioBDD.apellido;
    usuarioBDD.telefono = req.body.telefono || usuarioBDD.telefono;
    usuarioBDD.email = req.body.email || usuarioBDD.email;
    usuarioBDD.urlFotoPerfil = req.body.urlFotoPerfil || usuarioBDD.urlFotoPerfil;

    await usuarioBDD.save();

    res.status(200).json({ msg: "Perfil actualizado correctamente" });

  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};


const cambiarRolUsuario = async (req, res) => {
  const { rol: nuevoRol } = req.body;
  const usuario = req.usuario; 

  const rolesPermitidos = ['huesped', 'anfitrion'];
  if (!rolesPermitidos.includes(nuevoRol)) {
    return res.status(400).json({ msg: 'Rol no permitido. Solo se puede cambiar entre huesped y anfitrion.' });
  }

  if (usuario.rol[0] === nuevoRol) {
    return res.status(400).json({ msg: `Ya tienes el rol ${nuevoRol}` });
  }

  usuario.rol = [nuevoRol];
  await usuario.save();

  res.status(200).json({ msg: `Tu rol ha sido actualizado a ${nuevoRol}` });
};


export {
    registroUsuario,
    loginUsuario,
    obtenerUsuarios,
    actualizarUsuario,
    cambiarRolUsuario
};
