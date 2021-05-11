const { Reactions } = require("../../database/models");
const { customError, getPagination, getPagingData } = require("../helpers");

exports.getReaccions = async () => {
  const likes = await Reactions.findAll();
  if (!likes || !likes.length) {
    throw customError(404, "No hay Reacciones en la base de datos");
  }
  return likes;
};

exports.getReaccionsByPost = async (idPost, page, size) => {
  const { limit, offset } = getPagination(page, size);

  const content = await Reactions.findAndCountAll({
    limit: limit,
    offset: offset,
    where: { Posts_id: idPost },
  });
  const responseContent = getPagingData(content, page, limit);

  return responseContent;
};

exports.getReaccionsByUser = async (idUser, page, size) => {
  const { limit, offset } = getPagination(page, size);

  const content = await Reactions.findAndCountAll({
    limit: limit,
    offset: offset,
    where: { Users_id: idUser },
  });
  const responseContent = getPagingData(content, page, limit);

  return responseContent;
};

exports.createReaccions = async (userId, postId) => {
  const likeExist = await Reactions.findAll({
    where: { Posts_id: postId, Users_id: userId },
  });
  if (likeExist.length) {
    throw customError(500, `Ya habias reaccionado a este post`);
  }

  await Reactions.create({
    Users_id: userId,
    Posts_id: postId,
  });
};

exports.reactionExist = async (postId, userId) => {
  const reaction = await Reactions.findOne({
    where: { Posts_id: postId, Users_id: userId },
  });
  if (!reaction) {
    throw customError(404, "La reaccion no existe");
  }
  return reaction;
};

exports.destroyReaction = async (postId, userId) => {
  await Reactions.destroy({
    where: { Posts_id: postId, Users_id: userId },
  });
};

exports.destroyAllReactions = async (postId) => {
  await Reactions.destroy({
    where: { Posts_id: postId },
  });
};
