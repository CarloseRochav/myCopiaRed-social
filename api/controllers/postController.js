const { formatMessage } = require("../helpers");
const { Post, User } = require("../models");
const { imageService } = require("../services");

exports.getPost = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json({ code: 200, message: posts });
  } catch (error) {
    res.status(500).send("An error has occurred with the server.");
  }
};

exports.createPost = async (req, res) => {
  const { user } = req.user;
  const { id } = user;
  const userExist = await User.findByPk(id);
  const myFile = req.file.originalname.split(".");
  const fileType = myFile[myFile.length - 1];
  const buffer = req.file.buffer;
  try {
    if (!userExist) {
      throw res
        .status(404)
        .json({ code: 404, message: "El usuario no existe" });
    }
    await imageService.uploadVideo(req, fileType, buffer, res, id);
    res.status(200).json({ code: 200, message: "Post creado exitosamente" });
  } catch (error) {
    res.status(500).json({ code: 500, message: error });
  }
};

exports.getPostById = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await Post.findOne({ where: { id: postId } });
    res.status(200).json({ code: 200, message: post });
  } catch (error) {
    res.status(500).json({ code: 500, message: error });
  }
};

exports.getProfilePostById = async (req, res) => {
  const { user } = req.user;
  const { id } = user;
  try {
    const userExist = await User.findByPk(id);
    if (!userExist) {
      throw res
        .status(404)
        .json({ code: 404, message: "El usuario no existe" });
    }
    const post = await Post.findAll({ where: { User_id: id } });
    res.status(200).json({ code: 200, message: post });
  } catch (error) {
    res.status(500).json({ code: 500, message: error });
  }
};

exports.updatePost = async (req, res) => {
  const { user } = req.user;
  const { id } = user;
  const userExist = await User.findByPk(id);

  const postId = req.params.id;
  const newPost = req.body;
  const postExist = await Post.findByPk(postId);
  try {
    if (!userExist) {
      throw res
        .status(404)
        .json({ code: 404, message: "El usuario no existe" });
    }
    if (!postExist) {
      throw res
        .status(404)
        .json({ code: 404, message: "La Publicación no existe" });
    }
    const post = await Post.findOne({ where: { id: postId, User_id: id } });
    if (!post) {
      throw res.status(400).json({ code: 400, message: "Usuario Incorrecto" });
    }
    await post.update(newPost);
    res
      .status(200)
      .json({ code: 200, message: "La Publicación ha sido actualizada" });
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, message: "Un Problema ha ocurrido con el servidor" });
  }
};

exports.deletePost = async (req, res) => {
  const { user } = req.user;
  const { id } = user;
  const userExist = await User.findByPk(id);

  const postId = req.params.id;
  const postExist = await Post.findByPk(postId);

  try {
    if (!userExist) {
      throw res
        .status(404)
        .json({ code: 404, message: "El usuario no existe" });
    }
    if (!postExist) {
      throw res
        .status(404)
        .json({ code: 404, message: "La publicacion no existe" });
    }
    await Post.destroy({ where: { id: postId, User_id: id } });
    res
      .status(200)
      .json({ code: 200, message: "La Publicación ha sido borrada" });
  } catch (error) {
    res.status(500).json({ code: 500, message: error });
  }
};
