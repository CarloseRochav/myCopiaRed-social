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

exports.createReaccions = async (req, res) => {
  const { user } = req.user;
  const { id } = user;
  const postId = req.params.idPost;

  try {
    await userService.userExist(id);
    await postService.postExist(postId);
    await reaccionService.createReaccions(body, id, postId);
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
  const postId = req.body.idPost;
  const reacciontId = req.params.idreaccion;

  try {
    await userService.userExist(id);
    await postService.postExist(postId);
    await reaccionService.reactionExist(reacciontId);
    await reaccionService.destroyReaction(reacciontId, postId, id);
    return res
      .status(200)
      .json({ code: 200, msg: "Reaccion eliminada con exito" });
  } catch (error) {
    return res
      .status(error.code ? error.code : 500)
      .json(error.message ? { code: 500, msg: error.message } : error);
  }
};
