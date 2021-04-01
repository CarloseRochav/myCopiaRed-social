exports.formatError = (error, code, messagePersonalized = null) => {
  let messageError = null;
  if (error) {
    const { errors } = error;
    const { message } = errors[0];
    messageError = message;
  }
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

exports.validationError = (code, message) => {
  const result = {};
  result.code = code;
  result.msg = message;
  return result;
};
