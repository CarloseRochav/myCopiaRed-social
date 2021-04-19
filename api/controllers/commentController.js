const { postService, userService, commentService } = require("../services");
const { Comments } = require("../../database/models");

exports.getComments = async (req, res) => {
  try {
    const comments = await commentService.getComments();
    return res.status(200).json({ code: 200, msg: comments });
  } catch (error) {
    return res
      .status(error.code ? error.code : 500)
      .json(error.message ? { code: 500, msg: error.message } : error);
  }
};

exports.createComments = async (req, res) => {
  const { user } = req.user;
  const { id } = user;
  const postId = req.params.idpost;

  try {
    await userService.userExist(id);
    await postService.postExist(postId);
    await commentService.createComment(req.body.comment, id, postId);
    await postService.addComment(postId);

    return res
      .status(200)
      .json({ code: 200, msg: "Comentario creado exitosamente" });
  } catch (error) {
    return res
      .status(error.code ? error.code : 500)
      .json(error.message ? { code: 500, msg: error.message } : error);
  }
};

exports.getCommentsById = async (req, res) => {
  const commentId = req.params.id;
  try {
    const comment = await commentService.getCommentById(commentId);
    return res.status(200).json({ code: 200, msg: comment });
  } catch (error) {
    return res
      .status(error.code ? error.code : 500)
      .json(error.message ? { code: 500, msg: error.message } : error);
  }
};

exports.getCommentsByPostId = async (req, res) => {
  const postId = req.params.id;
  try {
    const comments = await commentService.getCommentByPostId(postId);
    return res.status(200).json({ code: 200, msg: comments });
  } catch (error) {
    return res
      .status(error.code ? error.code : 500)
      .json(error.message ? { code: 500, msg: error.message } : error);
  }
};

exports.updateComments = async (req, res) => {
  const { user } = req.user;
  const { id } = user;
  const postId = req.params.idpost;
  const commentId = req.params.idcomment;

  try {
    await userService.userExist(id);
    await postService.postExist(postId);
    await commentService.commentExist(commentId);
    await Comments.update(
      { comment: req.body.comment },
      { where: { id: commentId, Posts_id: postId, Users_id: id } }
    );

    return res.status(200).json({ code: 200, msg: "Comentario Actualizado" });
  } catch (error) {
    return res
      .status(error.code ? error.code : 500)
      .json(error.message ? { code: 500, msg: error.message } : error);
  }
};
exports.deleteComments = async (req, res) => {
  const { user } = req.user;
  const { id } = user;
  const postId = req.params.idpost;
  const commentId = req.params.idcomment;

  try {
    await userService.userExist(id);
    await postService.postExist(postId);
    await commentService.commentExist(commentId);
    await commentService.destroyComment(commentId, postId, id);
    await postService.removeComment(postId);
    return res.status(200).json({ code: 200, msg: "Comentario eliminado" });
  } catch (error) {
    return res
      .status(error.code ? error.code : 500)
      .json(error.message ? { code: 500, msg: error.message } : error);
  }
};
