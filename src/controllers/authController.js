const bcrypt = require("bcryptjs");
const { generarToken } = require('../config/tokenConfig');
const { getUsuarioPorId, obtenerUsuarioPorEmail, crearUsuario, updateUsuario, deactivateUsuario } = require("../models/usuarioModel");

const obtenerUsuarioPorId = async (req, res) => {
  const { idUsuarios } = req.params; 
  try {
      const Usuario = await getUsuarioPorId(idUsuarios ? parseInt(idUsuarios) : null);
      if (Usuario.length === 0) {
          return res.status(404).json({ message: "No se encontraron usuario" });
      }
      console.log("Usuarios encontrados")
      res.status(200).json(Usuario);
  } catch (error) {
      console.error("Error al obtener usuario:", error.message);
      res.status(500).json({ message: "Error al obtener usuario", error: error.message });
  }
};

const login = async (req, res) => {
    const { correoUsuaro, passwordUsuario } = req.body;

    try {
        const usuario = await obtenerUsuarioPorEmail(correoUsuaro);
        if (!usuario) {
          return res.status(404).json({ message: "Usuario válido" });
        }
    
        const contrasenaValida = await bcrypt.compare(passwordUsuario, usuario.passwordUsuario);
        if (!contrasenaValida) {
          return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        const token = generarToken(usuario);
    
        res.status(200).json({ token });
      } catch (error) {
        res.status(500).json({ message: "Error al iniciar sesión", error: error.message });
      }
};

const registro = async (req, res) => {
    const {rol_idrol, estados_idestado, correoUsuaro, nombreCompletoUsuario, passwordUsuario, telefonoUsuario, fechaNacimientoUsuario, Clientes_idClientes} = req.body;
  
    try {
      const existeUsuario = await obtenerUsuarioPorEmail(correoUsuaro);
      if (existeUsuario) {
        return res.status(400).json({ message: "El usuario ya existe" });
      }
        
    const contrasenaEncriptada = await bcrypt.hash(passwordUsuario, 10);

    const usuarioNuevo = {
        rol_idrol,
        estados_idestado,
        correoUsuaro,
        nombreCompletoUsuario,
        passwordUsuario: contrasenaEncriptada,
        telefonoUsuario,
        fechaNacimientoUsuario,
        Clientes_idClientes,
    };

    await crearUsuario(usuarioNuevo);
    res.status(201).json({ message: "Usuario registrado exitosamente" });
    } catch (error) {
      res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
  };

  const ActualizarUsuarios = async (req, res) => {
    const {idUsuarios,rol_idrol,estados_idestado,correoUsuaro,nombreCompletoUsuario,passwordUsuario,telefonoUsuario,fechaNacimientoUsuario,Clientes_idClientes  } = req.body;
    try {
        const Usuarios = {idUsuarios, rol_idrol, estados_idestado, correoUsuaro, nombreCompletoUsuario, passwordUsuario, telefonoUsuario, fechaNacimientoUsuario, Clientes_idClientes };
        await updateUsuario(Usuarios);
         res.status(201).send("Usuarios Actualizado");
     } catch (error) {
        console.error('Error al Actualizar Usuarios:', error.message, error.stack);
        res.status(500).json({ message: 'Error al insertar el Usuario', error: error.message });
    }
};

const desactivarUsuario = async (req, res) => {
  const { idUsuarios } = req.params; 
  const { estados_idestado } = req.body; 
  try {
      const Usuarios = { idUsuarios, estados_idestado }; 
      await deactivateUsuario(Usuarios); 
      res.status(200).send("Usuario Inactivado");
  } catch (error) {
      console.error('Error al inactivar Usuario:', error.message, error.stack);
      res.status(500).json({ message: 'Error al inactivar el usuario', error: error.message });
  }
};

module.exports = {obtenerUsuarioPorId,login, registro, ActualizarUsuarios, desactivarUsuario};