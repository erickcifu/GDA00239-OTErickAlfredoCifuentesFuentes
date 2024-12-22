const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES;

const generarToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });
};

const verificarToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};

module.exports = { generarToken,verificarToken,};