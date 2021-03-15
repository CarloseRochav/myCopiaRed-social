const jwt = require("jsonwebtoken");
const { secret } = require("../../config/auth");

module.exports = (req, res, next) => {
  // Comprobar que existe el token
  if (!req.headers.authorization) {
    res.status(401).json({ msg: "Acceso no autorizado" });
  } else {
    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(500).json({
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
