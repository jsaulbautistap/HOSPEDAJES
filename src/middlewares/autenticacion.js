// middleware/verificarAutenticacion.js

import jwt from 'jsonwebtoken'
import Usuario from '../models/usuarios.js'

const verificarAutenticacion = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ msg: "Token no proporcionado" });
  }

  try {
    const { id, rol } = jwt.verify(token, process.env.JWT_SECRET);
    
    // Buscar al usuario autenticado
    const usuario = await Usuario.findById(id).select("-password");
    if (!usuario) return res.status(404).json({ msg: "Usuario no encontrado" });

    // Agregar el usuario autenticado al request
    req.usuario = usuario;

    next();
  } catch (error) {
    return res.status(401).json({ msg: "Token inválido" });
  }
};

export default verificarAutenticacion;
