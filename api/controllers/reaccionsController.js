const { Post, User, Reaccions } = require("../models");

exports.getReaccions = async (req, res) => {
  try {
    const reaccion = await Reaccions.findAll();
    res.status(200).send(reaccion);
  } catch (error) {
    return res
      .status(error.code ? error.code : 500)
      .json(error.message ? { code: 500, msg: error.message } : error);
  }
};

exports.createReaccions = async (req, res) => {
  const { user } = req.user;
  const { id } = user;
  const userExist = await User.findByPk(id);

  const postId = req.params.idPost;
  const postExist = await Post.findByPk(postId);

  try {
    if (!userExist) {
      throw res.status(404).send("Usuario no existe");
    }
    if (!postExist) {
      throw res.status(404).send("Publicación no existe");
    }
    await Reaccions.create({
      reaccion: req.body.reaccion,
      User_id: id,
      Post_id: postId,
    });
    res.status(201).send("Reaccion creada");
  } catch (error) {
    return res
      .status(error.code ? error.code : 500)
      .json(error.message ? { code: 500, msg: error.message } : error);
  }
};

exports.deleteReaccions = async (req, res) => {
  const { user } = req.user;
  const { id } = user;
  const userExist = await User.findByPk(id);

  const postId = req.body.idPost;
  const postExist = await Post.findByPk(postId);

  const reacciontId = req.params.idreaccion;
  const reaccionsExist = await Reaccions.findByPk(reacciontId);

  try {
    if (!userExist) {
      throw res.status(404).send("Usuario no existe");
    }
    if (!postExist) {
      throw res.status(404).send("Publicación no existe");
    }
    if (!reaccionsExist) {
      throw res.status(404).send("Comentario no existe");
    }
    await Reaccions.destroy({
      where: { id: reacciontId, Post_id: postId, User_id: id },
    });
    res.status(200).send("Reaccion has been deleted.");
  } catch (error) {
    return res
      .status(error.code ? error.code : 500)
      .json(error.message ? { code: 500, msg: error.message } : error);
  }
};
