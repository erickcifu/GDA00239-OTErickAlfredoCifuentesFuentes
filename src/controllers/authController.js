const Usuario = require("../models/usuarioModel");
const bcrypt = require('bcryptjs');
const { generarToken } = require('../config/tokenConfig');

const obtenerUsuarioPorId = async (req, res) => {
    const { idUsuarios } = req.params;
    try {
        const usuarios = await Usuario.getUsuarioPorId(idUsuarios ? parseInt(idUsuarios) : null);
        if (usuarios.length === 0) {
            return res.status(404).json({ message: 'No se encontraron usuarios.' });
        }
        res.status(200).json(usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios:', error.message);
        res.status(500).json({ message: 'Error al obtener usuarios.', error: error.message });
    }
};

const login = async (req, res) => {
    const { correoUsuaro, passwordUsuario } = req.body;
    try {
        const usuario = await Usuario.obtenerUsuarioPorEmail(correoUsuaro);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        const contrasenaValida = await bcrypt.compare(passwordUsuario, usuario.passwordUsuario);
        if (!contrasenaValida) {
            return res.status(401).json({ message: 'Contraseña incorrecta.' });
        }

        const token = generarToken(usuario);
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error al iniciar sesión:', error.message);
        res.status(500).json({ message: 'Error al iniciar sesión.', error: error.message });
    }
};

const registro = async (req, res) => {
    try {
        const usuarioExistente = await Usuario.obtenerUsuarioPorEmail(req.body.correoUsuaro);
        if (usuarioExistente) {
            return res.status(400).json({ message: 'El usuario ya existe.' });
        }

        await Usuario.crearUsuario(req.body);
        res.status(201).json({ message: 'Usuario registrado exitosamente.' });
    } catch (error) {
        console.error('Error al registrar usuario:', error.message);
        res.status(500).json({ message: 'Error al registrar usuario.', error: error.message });
    }
};

const actualizarUsuario = async (req, res) => {
    try {
        
        await Usuario.updateUsuario(req.body);

        res.status(200).json({ message: 'Usuario actualizado correctamente.' });
    } catch (error) {
        console.error('Error al actualizar usuario:', error.message);
        res.status(500).json({ message: 'Error al actualizar usuario.', error: error.message });
    }
};

const desactivarUsuario = async (req, res) => {
    const { idUsuarios } = req.params;
    const { estados_idestado } = req.body;
    try {
        await Usuario.deactivateUsuario(idUsuarios, estados_idestado);
        res.status(200).json({ message: 'Usuario desactivado correctamente.' });
    } catch (error) {
        console.error('Error al desactivar usuario:', error.message);
        res.status(500).json({ message: 'Error al desactivar usuario.', error: error.message });
    }
};

module.exports = { obtenerUsuarioPorId, login, registro, actualizarUsuario, desactivarUsuario };
