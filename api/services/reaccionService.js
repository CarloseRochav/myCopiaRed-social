const { Reaccions } = require("../models");
const { customError, getPagination, getPagingData } = require("../helpers");

exports.getReaccions = async () => {
  const likes = await Reaccions.findAll();
  if (!likes || !likes.length) {
    throw customError(404, "No hay Reacciones en la base de datos");
  }
  return likes;
};

exports.getReaccionsByPost = async (idPost, page, size) => {
  const { limit, offset } = getPagination(page, size);

  const content = await Reaccions.findAndCountAll({
    limit: limit,
    offset: offset,
    where: { Post_id: idPost },
  });
  const responseContent = getPagingData(content, page, limit);

  return responseContent;
};

exports.getReaccionsByUser = async (idUser, page, size) => {
  const { limit, offset } = getPagination(page, size);

  const content = await Reaccions.findAndCountAll({
    limit: limit,
    offset: offset,
    where: { User_id: idUser },
  });
  const responseContent = getPagingData(content, page, limit);

  return responseContent;
};

exports.createReaccions = async (userId, postId) => {
  const likeExist = await Reaccions.findAll({
    where: { Post_id: postId, User_id: userId },
  });
  if (likeExist.length) {
    throw customError(500, `Ya habias reaccionado a este post`);
  }

  await Reaccions.create({
    User_id: userId,
    Post_id: postId,
  });
};

exports.reactionExist = async (postId, userId) => {
  const reaction = await Reaccions.findOne({
    where: { Post_id: postId, User_id: userId },
  });
  if (!reaction) {
    throw customError(404, "La reaccion no existe");
  }
  return reaction;
};

exports.destroyReaction = async (postId, userId) => {
  await Reaccions.destroy({
    where: { Post_id: postId, User_id: userId },
  });
};
