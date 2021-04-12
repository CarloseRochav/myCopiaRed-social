const { Comments, User } = require("../models");
const { customError } = require("../helpers");

exports.getComments = async () => {
  const comments = await Comments.findAll();
  if (!comments || !comments.length) {
    throw customError(404, "No hay comentarios en la base de datos.");
  }
  return comments;
};

exports.createComment = async (_comment, id, postId) => {
  await Comments.create({
    comment: _comment,
    User_id: id,
    Post_id: postId,
  });
};

exports.getCommentById = async (_id) => {
  const comment = await Comments.findOne({ where: { id: _id } });
  return comment;
};
exports.commentExist = async (_id) => {
  const commentId = parseInt(_id);
  const comment = await Comment.findOne({
    where: { id: commentId ? commentId : -10 },
  });
  if (!comment) {
    throw customError(404, "El usuario no existe.");
  }
  return comment;
};

exports.getCommentByPostId = async (_id) => {
  const comments = await Comments.findAll({
    where: { Post_id: _id },
    include: [{ model: User, attributes: ["id", "name", "picture"] }],
  });
  return comments;
};

exports.commentExist = async (_id) => {
  const commentId = parseInt(_id);
  const comment = await Comment.findOne({
    where: { id: commentId ? commentId : -10 },
  });
  if (!comment) {
    throw customError(404, "El usuario no existe.");
  }
  return comment;
};

exports.destroyComment = async (commentId, postId, id) => {
  await Comments.destroy({
    where: { id: commentId, Post_id: postId, User_id: id },
  });
};
