const { Post } = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//cambie User por Post para adapaptarlo
exports.getPost = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.status(200).send(posts);
  } catch (error) {
    res.status(500).send("An error has occurred with the server.");
  }
};
//no estoy muy seguro de este metodo, creo que le falta algo, investigar que falta
exports.createPost = async (req, res) => {
  const postId = req.params.id;
  try {
    await Post.create({
      title: req.body.title,
      description: req.body.description,
      user: req.body.user,
      video: req.body.video,
      reactions: req.body.reactions,
    });

    res.status(201).send("The new post has been created.");
  } catch (error) {
    res.status(500).send("No se puede crear tu publicacion por alguna extraña razon ;( ");
  }
};

exports.getPostById = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await Post.findOne({ where: { id: postId } });
    res.status(200).send(post);
  } catch (error) {
    res.status(500).send("An error has occurred with the server.");
  }
};

exports.updatePost = async (req, res) => {
  const postId = req.params.id;
  const newPost = req.body;
  console.log(newPost);
  try {
    const post = await Post.findOne({ where: { id: postId } });
    try {
      await post.update(newPost);
      res.status(200).send("User data has been updated.");
    } catch (error) {
      res.status(500).send("An error has occurred with the server.");
    }
  } catch (error) {
    res
      .status(500)
      .send("An error has occurred with the server. Usuario no encontrado");
  }
};

exports.deletePost = async (req, res) => {
  const postId = req.params.id;
  try {
    await Post.destroy({ where: { id: postId } });
    res.status(200).send("User has been deleted.");
  } catch (error) {
    res.status(500).send("An error has occurred with the server.");
  }
};