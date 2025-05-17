import mongoose from "mongoose";

import Usuario from "../models/usuarios.js";
import generarJWT  from "../helpers/generarJWT.js";

// Controlador para registrar un nuevo usuario
const registroUsuario = async (req, res) => {
  const { email, password } = req.body;

   try {

    // Valida que los datos estén completos
    if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos obligatorios" });
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
    const { _id, nombre, apellido, cedula, telefono, email: emailUsuario, rol, urlFotoPerfil } = usuarioBDD;

    res.status(200).json({
      token,
      _id,
      nombre,
      apellido,
      cedula,
      telefono,
      email: emailUsuario,
      rol,
      urlFotoPerfil
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


export {
    registroUsuario,
    loginUsuario,
    obtenerUsuarios
};
