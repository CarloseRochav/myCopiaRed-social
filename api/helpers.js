exports.random = () => {
  var x = "";
  for (var i = 0; i < 6; i++) {
    x += Math.floor(Math.random() * 10);
  }
  return x;
};

exports.customError = (code = 500, msg = "Error en el sistema") => {
  const error = new Error();
  error.code = code;
  error.msg = msg;
  return error;
};
