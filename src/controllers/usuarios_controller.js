import mongoose from "mongoose";

import Usuario from "../models/usuarios.js";
import generarJWT  from "../helpers/generarJWT.js";


import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

import { enviarEmail } from "../helpers/email.js";

// Registrar usuario
const registroUsuario = async (req, res) => {
  const { email, password } = req.body;

   try {
    if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos obligatorios" });
    if(password.length < 6) return res.status(400).json({ msg: "Lo sentimos, la contraseña debe tener al menos 6 caracteres" })
    const verificarEmailBDD = await Usuario.findOne({ email });
    if (verificarEmailBDD) return res.status(400).json({ msg: "Lo sentimos, el email ya se encuentra registrado" });

    const verificarCedulaBDD = await Usuario.findOne({ cedula: req.body.cedula });
    if (verificarCedulaBDD) return res.status(400).json({ msg: "Lo sentimos, la cédula ya se encuentra registrada" });
    if (req.body.cedula.length !== 10) return res.status(400).json({ msg: "Lo sentimos, la cédula debe tener 10 dígitos" });

    const nuevoUsuario = new Usuario(req.body);

    nuevoUsuario.password = await nuevoUsuario.encryptPassword(password);
    await nuevoUsuario.save();
    res.status(201).json({ msg: "Usuario registrado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Hubo un error al registrar el usuario. Intenta nuevamente." });
  }
};



// Iniciar sesión
const loginUsuario = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" });

    const usuarioBDD = await Usuario.findOne({ email }).select("-__v -createdAt -updatedAt");
    if (!usuarioBDD) return res.status(404).json({ msg: "Lo sentimos, el usuario no se encuentra registrado" });

    if (usuarioBDD.estadoCuenta !== 'activo') return res.status(403).json({ msg: `Cuenta ${usuarioBDD.estadoCuenta}. Comunicate con Soporte, para más información` });

    const verificarPassword = await usuarioBDD.matchPassword(password);
    if (!verificarPassword) return res.status(401).json({ msg: "Lo sentimos, el password no es el correcto" });

    const token = generarJWT(usuarioBDD._id, usuarioBDD.rol);

    const { _id, nombre, apellido, email: emailUsuario, rol, urlFotoPerfil } = usuarioBDD;

    res.status(200).json({
      token,
      usuario: {
        _id,
        nombre,
        apellido,
        email: emailUsuario,
        rol,
        urlFotoPerfil
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al intentar iniciar sesión" });
  }
}


// Obtener todos los usuarios (administrador)
const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find({}, "nombre email estadoCuenta -_id");
    res.status(200).json({ msg: "TODOS LOS USUARIOS REGISTRADOS: ", usuarios });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ msg: "Error al obtener los usuarios" });
  }
};



// Actualizar usuario
const actualizarUsuario = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: "Lo sentimos, debe ser un ID válido" });
  }

  if (Object.values(req.body).includes("")) {
    return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" });
  }
  if (req.usuario._id !== id) {
  return res.status(403).json({ msg: "Solo puedes actualizar tu propio perfil" });
  }

  try {
    const usuarioBDD = await Usuario.findById(id);
    if (!usuarioBDD) {
      return res.status(404).json({ msg: `Lo sentimos, no existe el usuario con ID ${id}` });
    }

    if (usuarioBDD.email !== req.body.email) {
      const usuarioExistente = await Usuario.findOne({ email: req.body.email });
      if (usuarioExistente) {
        return res.status(400).json({ msg: "Lo sentimos, ese email ya se encuentra registrado" });
      }
    }

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


// Cambiar rol de usuario
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


// Obtener perfil de usuario
const perfilUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario._id)
      .select("nombre apellido email telefono urlFotoPerfil rol saldo estadoCuenta");

    if (!usuario) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener el usuario en especifico, error:", error });
  }
};

// Subir foto de perfil
const storageFotoPerfil = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const publicId = `fotoPerfil_${req.usuario._id}`; 
    return {
      folder: 'fotoPerfilesUsuarios',
      public_id: publicId,
      allowed_formats: ['jpg', 'jpeg', 'png'],
      overwrite: true,
      transformation: [{ width: 400, height: 400, crop: 'fill', gravity: 'face' }]
    };
  }
});


const uploadFotoPerfil = multer({ storage: storageFotoPerfil });
const crearFotoPerfil = uploadFotoPerfil.single('fotoPerfil');
const subirFotoPerfil = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario._id);
    if (!usuario) return res.status(404).json({ msg: "Usuario no encontrado" });

    if (usuario.public_idFotoPerfil) {
      await cloudinary.uploader.destroy(usuario.public_idFotoPerfil);
    }

    const { path, filename } = req.file;
    usuario.urlFotoPerfil = path;
    usuario.public_idFotoPerfil = filename;

    await usuario.save();
    res.status(200).json({ msg: "Foto de perfil actualizada correctamente", url: usuario.urlFotoPerfil });

  } catch (error) {
    console.error("Error al subir foto de perfil:", error);
    res.status(500).json({ msg: "Error al subir la foto de perfil" });
  }
};

// Eliminar foto de perfil
const eliminarFotoPerfil = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario._id);
    if (!usuario) return res.status(404).json({ msg: "Usuario no encontrado" });

    if (usuario.public_idFotoPerfil) {
      await cloudinary.uploader.destroy(usuario.public_idFotoPerfil);
      usuario.urlFotoPerfil = "";
      usuario.public_idFotoPerfil = "";
      await usuario.save();
    }

    res.status(200).json({ msg: "Foto de perfil eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar foto de perfil:", error);
    res.status(500).json({ msg: "Error al eliminar la foto de perfil" });
  }
};




// Depositar saldo de usuario
const depositarSaldo = async (req, res) => {
  try {
    const { idusuario } = req.params;
    let { monto } = req.body;

    monto = parseFloat(monto);
    if (!monto || monto <= 0) {
      return res.status(400).json({ msg: 'Monto inválido. Debe ser mayor que cero.' });
    }
    const usuario = await Usuario.findById(idusuario);
    if (!usuario) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }
    usuario.saldo += monto;
    await usuario.save();
    res.status(200).json({ msg: 'Saldo depositado exitosamente', nuevoSaldo: usuario.saldo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al depositar el saldo', error: error.message });
  }
};



// Recuperar contraseña
const recuperarPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ msg: "El email es obligatorio" });

  const usuario = await Usuario.findOne({ email });
  if (!usuario) return res.status(404).json({ msg: "El usuario no existe" });

  const token = usuario.crearToken();
  usuario.token = token;
  await usuario.save();

  await enviarEmail(email, token);
  res.json({ msg: "Revisa tu correo para recuperar la contraseña" });
};

// Comprobar token de recuperación de contraseña
const comprobarTokenPassword = async (req, res) => {
  const { token } = req.params;

  const usuario = await Usuario.findOne({ token });
  if (!usuario) return res.status(400).json({ msg: "Token inválido o expirado" });

  res.json({ msg: "Token válido" });
};

// Actualizar contraseña
const nuevoPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const usuario = await Usuario.findOne({ token });
  if (!usuario) return res.status(400).json({ msg: "Token inválido" });
  if (!password || password.length < 6) {
  return res.status(400).json({ msg: "Contraseña debe tener al menos 6 caracteres" });
  }
  usuario.password = await usuario.encryptPassword(password);
  usuario.token = ""; 
  await usuario.save();

  res.json({ msg: "Contraseña actualizada correctamente" });
};


export {
    registroUsuario,
    loginUsuario,
    obtenerUsuarios,
    actualizarUsuario,
    cambiarRolUsuario,
    perfilUsuario,
    subirFotoPerfil,
    crearFotoPerfil,
    eliminarFotoPerfil,
    depositarSaldo,
    recuperarPassword,
    comprobarTokenPassword,
    nuevoPassword
};
