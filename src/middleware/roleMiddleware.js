const Usuario = require('../models/usuarioModel'); 
const { obtenerUsuarioPorId } = require('../controllers/authController');

const validarRol = (rolesPermitidos) => {
  return async (req, res, next) => {
    try {

      console.log("Validando rol. Datos del usuario:", req.user);

      const userId = req.user?.idUsuarios; 
      if (!userId) {
        return res.status(401).json({ mensaje: "Usuario no autenticado" });
      }

      const usuario = await obtenerUsuarioPorIdDirecto(userId);
      console.log("Usuario obtenido para validación de rol:", usuario);
      if (!usuario) {
        return res.status(404).json({ mensaje: "Usuario no encontrado" });
      }

      const rolUsuario = usuario.rol_idrol; 
      if (!rolesPermitidos.includes(rolUsuario)) {
        console.log('no tiene acceso este rol ');
        return res.status(403).json({ mensaje: "Acceso denegado: Rol no permitido" });
      }
      console.log("Rol validado con éxito."); 
      next();
    } catch (error) {
      console.error('Error al validar rol:', error.message);
      return res.status(500).json({ mensaje: "Error interno al validar el rol", detalle: error.message });
    }
  };
};

const obtenerUsuarioPorIdDirecto = async (idUsuarios) => {
  try {
    const usuarios = await Usuario.getUsuarioPorId(idUsuarios);
    console.log("Usuario obtenido:", usuarios);
    return usuarios.length > 0 ? usuarios[0] : null;
  } catch (error) {
    console.error('Error al obtener usuario:', error.message);
    throw error;
  }
};

module.exports = { validarRol };
