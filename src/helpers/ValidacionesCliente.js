const Joi = require("joi");

const validarDatosCliente = (datos) => {
    const schema = Joi.object({
        razon_social: Joi.string().max(245).required(),
        nombreComercial: Joi.string().max(45).required(),
        Nit: Joi.string().max(10).required(),
        direccionEntrega: Joi.string().max(45).required(),
        telefonoCliente: Joi.string().max(45).required(),
        emailCliente: Joi.string().email().max(45).required(),
    });

    return schema.validate(datos);
};

module.exports = { validarDatosCliente };
