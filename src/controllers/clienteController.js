const { getCliente, createCliente, updateClientes } = require('../models/clienteModel');

const obtenerClientes = async (req, res) => {
    const { idCliente } = req.params; 
    try {
        const clientes = await getCliente(idCliente ? parseInt(idCliente) : null);
        if (clientes.length === 0) {
            return res.status(404).json({ message: "No se encontraron clientes" });
        }
        console.log("clientes encontrados")
        res.status(200).json(clientes);
    } catch (error) {
        console.error("Error al obtener cliente:", error.message);
        res.status(500).json({ message: "Error al obtener cliente", error: error.message });
    }
};

const crearCliente = async (req, res) => {
    const {razon_social,nombreComercial,Nit,direccionEntrega,telefonoCliente,emailCliente } = req.body;
    try {
        const clientes = { razon_social, nombreComercial, Nit, direccionEntrega, telefonoCliente, emailCliente };
        await createCliente(clientes);
         res.status(201).send("Cliente creado");
     } catch (error) {
        console.error('Error al crear Cliente:', error.message, error.stack);
        res.status(500).json({ message: 'Error al insertar el Cliente', error: error.message });
    }
};

const ActualizarCliente = async (req, res) => {
    const {idCliente, razon_social, nombreComercial, Nit, direccionEntrega,telefonoCliente,emailCliente } = req.body;
    try {
        const clientes = {idCliente, razon_social, nombreComercial, Nit, direccionEntrega,telefonoCliente,emailCliente };
        await updateClientes(clientes);
         res.status(201).send("Clientes Actualizado");
     } catch (error) {
        console.error('Error al Actualizar Clientes:', error.message, error.stack);
        res.status(500).json({ message: 'Error al insertar el cliente', error: error.message });
    }
};
module.exports = { obtenerClientes, crearCliente, ActualizarCliente};
