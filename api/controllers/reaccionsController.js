const { postService, userService, reaccionService } = require("../services");

exports.getReaccions = async (req, res) => {
  try {
    const reaccion = await reaccionService.getReaccions();
    return res.status(200).json({ code: 200, msg: reaccion });
  } catch (error) {
    return res
      .status(error.code ? error.code : 500)
      .json(error.message ? { code: 500, msg: error.message } : error);
  }
};

exports.getReaccionsByPost = async (req, res) => {
  const idPost = req.params.id;
  const { page, size } = req.query;
  try {
    await postService.postExist(idPost);
    const reactions = await reaccionService.getReaccionsByPost(
      idPost,
      page,
      size
    );
    return res.status(200).json({ code: 200, msg: reactions });
  } catch (error) {
    return res
      .status(error.code ? error.code : 500)
      .json(error.message ? { code: 500, msg: error.message } : error);
  }
};

exports.getReaccionsByUser = async (req, res) => {
  const { user } = req.user;
  const { id } = user;
  const { page, size } = req.query;
  try {
    await userService.userExist(id);
    const reactions = await reaccionService.getReaccionsByUser(id, page, size);
    return res.status(200).json({ code: 200, msg: reactions });
  } catch (error) {
    return res
      .status(error.code ? error.code : 500)
      .json(error.message ? { code: 500, msg: error.message } : error);
  }
};

exports.createReaccions = async (req, res) => {
  const { user } = req.user;
  const { id } = user;
  const postId = req.params.id;

  try {
    await userService.userExist(id);
    await postService.postExist(postId);
    await reaccionService.createReaccions(id, postId);
    await postService.addReaction(postId);

    return res
      .status(200)
      .json({ code: 200, msg: "Reaccion creada con exito" });
  } catch (error) {
    return res
      .status(error.code ? error.code : 500)
      .json(error.message ? { code: 500, msg: error.message } : error);
  }
};

exports.deleteReaccions = async (req, res) => {
  const { user } = req.user;
  const { id } = user;
  const postId = req.params.id;
  try {
    await userService.userExist(id);
    await postService.postExist(postId);
    await reaccionService.reactionExist(postId, id);
    await reaccionService.destroyReaction(postId, id);
    await postService.removeReaction(postId);
    return res
      .status(200)
      .json({ code: 200, msg: "Reaccion eliminada con exito" });
  } catch (error) {
    return res
      .status(error.code ? error.code : 500)
      .json(error.message ? { code: 500, msg: error.message } : error);
  }
};
