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

exports.getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

exports.getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: content } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, content, totalPages, currentPage };
};
