const jwt = require("jsonwebtoken"); //libreria de JWT
const { secret } = require("../../config/auth"); //usando la configuracion secret

module.exports = (req, res, next) => {
  // Comprobar que existe el token
  if (!req.headers.authorization) {
    res.status(401).json({ message: "Acceso no autorizado" });
  } else {
    //comprobar la validez de este token
    const token = req.headers.authorization.split(" ")[1];

    //comprobar la validez de este token
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(500).json({
          code: 500,
          msg: "Ha ocurrido un problema al decodificar el token",
          err,
        });
      } else {
        req.user = decoded;
        next();
      }
    });
  }
};
