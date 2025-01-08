const { verificarToken } = require('../config/tokenConfig');

const autenticar = (req, res, next) => {
  const header = req.header("Authorization");

  if (!header) {
    return res.status(401).json({ mensaje: "Token no ingresado" });
  }

  const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).json({ mensaje: "Token no proporcionado" });
  }

  try {
    const decoded = verificarToken(token, process.env.JWT_SECRET);
    req.user = decoded; 
    const idCliente = decoded.idCliente;

    if (!idCliente) {
      return res.status(400).json({ message: "El usuario no tiene un cliente asociado." });
    }

    console.log("Datos del usuario autenticado:", req.user);
    next();
  } catch (error) {
    return res.status(403).json({ mensaje: "Token inválido o expirado" });
  }
};

module.exports = { autenticar };