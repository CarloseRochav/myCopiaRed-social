exports.formatError = (error, code, messagePersonalized = null) => { //Metodo que recibe 3 parametros y regresa mensaje si es error o no
  let messageError = null;
  // if (error) {
  //   const { errors } = error;
  //   const { message } = errors[0];
  //   messageError = message;
  // }

  const {name}=error; //Nombre del error
  
  if(name=="SequelizeUniqueConstraintError")
    messageError="El usuario ha ingresado un valor que debe ser unico";
  if(name=="SequelizeValidationError")
    messageError="Un dato no es correcto, corrige tu error";

  const response = {
    code: code,
    message: messagePersonalized ? messagePersonalized : messageError,
  };
  return response;
};

exports.formatMessage = (code, messagePersonalized = "") => {
  const response = {
    code: code,
    message: messagePersonalized,
  };
  return response;
};

exports.random = () => {
  var x = "";
  for (var i = 0; i < 6; i++) {
    x += Math.floor(Math.random() * 10);
  }
  return x;
};


// Sequelize ->
// "name":"SequelizeUniqueConstraintError"
// "name": "SequelizeValidationError"