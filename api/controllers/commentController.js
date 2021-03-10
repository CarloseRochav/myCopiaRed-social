const { Comments } = require("../models");


//cambie User por Post para adapaptarlo
exports.getComments = async (req, res) => {
  try {
    const comment = await Comments.findAll();
    res.status(200).send(comment);
  } catch (error) {
    res.status(500).send("An error has occurred with the server.");
  }
};
//no estoy muy seguro de este metodo, creo que le falta algo, investigar que falta
exports.createComments = async (req, res) => {
  try {
    await Comments.create({
        comment: req.body.comment,
    });

    res.status(201).send("The new comment has been created.");
  } catch (error) {
    res.status(500).send("No se puede comentar en esta publicación");
  }
};

exports.getCommentsById = async (req, res) => {
  const commentId = req.params.id;
  try {
    const comment = await Comments.findOne({ where: { id: commentId } });
    res.status(200).send(comment);
  } catch (error) {
    res.status(500).send("An error has occurred with the server.");
  }
};

exports.updateComments = async (req, res) => {
  const commentId = req.params.id;
  const newcomment = req.body;
  console.log(newcomment);
  try {
    const comment = await Comments.findOne({ where: { id: commentId } });
    try {
      await comment.update(newcomment);
      res.status(200).send("Comment data has been updated.");
    } catch (error) {
      res.status(500).send("An error has occurred with the server.");
    }
  } catch (error) {
    res
      .status(500)
      .send("An error has occurred with the server. Usuario no encontrado");
  }
};

exports.deleteComments = async (req, res) => {
  const commentId = req.params.id;
  try {
    await Comments.destroy({ where: { id: commentId } });
    res.status(200).send("Comment has been deleted.");
  } catch (error) {
    res.status(500).send("An error has occurred with the server.");
  }
};