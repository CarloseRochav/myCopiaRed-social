const jwt = require("jsonwebtoken"); //Libreria de JWT
const { secret } = require("../../config/auth");//Configuracion ; Secret...

module.exports = (req, res, next) => {//Esto se necesita
  console.log(req.headers);

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

// Exportar toda esta configuracion para poder usarla con su metodo verify;
// Contiene la configuracion para Decodificar el tokem