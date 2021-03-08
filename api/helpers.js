exports.formatError = (
  error = [
    { errors: { message: "No se ha establecido un mensaje para este error" } },
  ],
  code,
  messagePersonalized = null
) => {
  const { errors } = error;
  const { message } = errors[0];
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
