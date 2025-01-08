const { sequelize } = require('../config/dbConfig');
const Clientes = require('../models/clienteModel.js');
const {validarDatosCliente} = require('../helpers/ValidacionesCliente');

const obtenerClientes = async (req, res) => {
    const { idCliente } = req.params;

    try {

        if (!idCliente) {
            return res.status(400).json({ message: "idCliente es requerido" });
        }

        if (idCliente) {
            // Si el idCliente está presente en los parámetros de la URL
            const Clientes = await sequelize.query(
                `EXEC ObtenerClientesID @p_idCliente=:idCliente`,
                {
                    replacements: { idCliente: idCliente },
                    type: sequelize.QueryTypes.SELECT,
                }
            );

            if (!Clientes || Clientes.length === 0) {
                return res.status(404).json({ message: "No se encontró el cliente con ese idCliente" });
            }

            return res.status(200).json(Clientes);
        } else {
            // Si no hay idCliente, puedes optar por devolver todos los clientes
            const Clientes = await sequelize.query(
                `EXEC ObtenerClientesID @p_idCliente=:idCliente`, // O la consulta que obtenga todos los clientes
                {
                    replacements: { idCliente: null },
                    type: sequelize.QueryTypes.SELECT,
                }
            );

            if (!Clientes || Clientes.length === 0) {
                return res.status(404).json({ message: "No se encontraron clientes" });
            }

            return res.status(200).json(Clientes);
        }
    } catch (error) {
        console.error("Error al obtener clientes:", error.message);
        return res.status(500).json({ message: "Error al obtener clientes", error: error.message });
    }
};

const crearCliente = async (req, res) => {
   try{
    const { razon_social, nombreComercial, Nit, direccionEntrega,telefonoCliente,emailCliente } = req.body;
    const [_, affectedRows] = await sequelize.query(
        `EXEC Insertarcliente 
            @p_razon_social=:razon_social,
            @p_nombreComercial=:nombreComercial,
            @p_Nit=:Nit,
            @p_direccionEntrega=:direccionEntrega,
            @p_telefonoCliente=:telefonoCliente,
            @p_emailCliente=:emailCliente`,
        {
            replacements: {
                razon_social,
                nombreComercial,
                Nit,
                direccionEntrega,
                telefonoCliente,
                emailCliente
            },
            type: sequelize.QueryTypes.INSERT
        }
    );
    res.status(201).json({
        message: "Cliente creado correctamente",
        affectedRows,
    });
   }catch (error){
       console.error("Error al crear cliente:", error.message);
       res.status(500).json({ message: "Error al crear cliente", error: error.message });
   }
};

const ActualizarCliente = async (req, res) => {
    const { razon_social, nombreComercial, Nit, direccionEntrega,telefonoCliente,emailCliente } = req.body;

    const { idCliente } = req.params;

    try{
        const clienteExistente = await sequelize.query(
            `EXEC ObtenerClientesID @p_idCliente=:idCliente`,
            {
                replacements: { idCliente },
                type: sequelize.QueryTypes.SELECT,
            }
        );
        if (!clienteExistente || clienteExistente.length === 0) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const idCliente = decoded.idCliente;

        if (!idCliente) {
            return res.status(400).json({ message: "El usuario no tiene un cliente asociado." });
        }

        await sequelize.query(
            `EXEC ActualizarCliente 
                @p_idCliente=:idCliente,
                @p_razon_social=:razon_social,
                @p_nombreComercial=:nombreComercial,
                @p_Nit=:Nit,
                @p_direccionEntrega=:direccionEntrega,
                @p_telefonoCliente=:telefonoCliente,
                @p_emailCliente=:emailCliente`,
            {
                replacements: {
                    idCliente,
                    razon_social,
                    nombreComercial,
                    Nit,
                    direccionEntrega,
                    telefonoCliente,
                    emailCliente,
                },
                type: sequelize.QueryTypes.UPDATE,
            }
        );

        res.status(200).json({ message: "Cliente actualizado correctamente" });
    
    }catch (error) {
        console.error("Error al actualizar cliente:", error.message);
        res.status(500).json({ message: "Error al actualizar cliente", error: error.message });
    }
};
module.exports = { obtenerClientes, crearCliente, ActualizarCliente };
