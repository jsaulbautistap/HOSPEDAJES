const verificarRol = (rolesPermitidos = []) => {
  return (req, res, next) => {
    const usuario = req.usuario;

    if (!usuario || !usuario.rol || !rolesPermitidos.includes(usuario.rol[0])) {
      return res.status(403).json({ msg: "Acceso denegado: no tienes permisos suficientes" });
    }

    next();
  };
};

export default verificarRol;
