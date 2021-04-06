const { Reaccions } = require("../models");
const { customError } = require("../helpers");

exports.getReaccions = async () => {
  const likes = await Reaccions.findAll();
  if (!likes || !likes.length) {
    throw customError(404, "No hay Reacciones en la base de datos");
  }
  return likes;
};

exports.createReaccions = async (body, userId, postId) => {
  await Reaccions.create({
    reaccion: body.reaccion,
    User_id: userId,
    Post_id: postId,
  });
};

exports.reactionExist = async (_reactionId) => {
  const reactionId = parseInt(_reactionId);
  const reaction = await Post.findOne({ where: { id: reactionId } });
  if (!reaction) {
    throw customError(404, "La reaccion no existe");
  }
  return reaction;
};

exports.destroyReaction = async (reacciontId, postId, userId) => {
  await Reaccions.destroy({
    where: { id: reacciontId, Post_id: postId, User_id: userId },
  });
};
