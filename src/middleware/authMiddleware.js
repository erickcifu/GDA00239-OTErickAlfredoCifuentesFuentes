const { verificarToken } = require('../config/tokenConfig');

const autenticar = (req, res, next) => {
  const header = req.header("Authorization");
  
  if (!header) {
    return res.status(401).json({ message: "Token no ingresado" });
  }

  const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  try {
    const decoded = verificarToken(token);
    req.usuario = decoded;
    next();
  } catch (error) {
      return res.status(403).json({ message: "Token inválido o expirado" });
  }
};


module.exports  = {autenticar};
