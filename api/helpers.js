exports.formatError = (error, code, messagePersonalized = null) => {
  let messageError = null;
  if (error) {
    const { errors } = error;
    const { message } = errors[0];
    messageError = message;
  }
  const response = {
    code: code,
    message: messagePersonalized ? messagePersonalized : message,
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
