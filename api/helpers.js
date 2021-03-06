exports.formatError = (error, code) => {
  const { errors } = error;
  const { message } = errors[0];
  const response = {
    code: code,
    message: message,
  };
  return response;
};
