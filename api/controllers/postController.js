const { formatMessage } = require("../helpers");
const { Post, User } = require("../models");

//cambie User por Post para adapaptarlo
exports.getPost = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.status(200).send(posts);
  } catch (error) {
    res.status(500).send("An error has occurred with the server.");
  }
};

exports.createPost = async (req, res) => {
  const { user } = req.user;
  const { id } = user;
  const  userExist = await User.findByPk(id);
  try { 
    if(!userExist){
      throw res.status(404).send("Usuario no existe");
    }
    await Post.create({
      title: req.body.title,
      description: req.body.description,
      video: req.body.video,
      reactions: req.body.reactions,
      User_id: id,
    });
    res.status(201).send("Post creado exitosamente ");

  } catch (error) {
    res.status(500).send(error);  
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
  const { user } = req.user;
  const { id } = user; 
  const userExist = await User.findByPk(id);

  const postId  = req.params.id;
  const newPost = req.body;
  const postExist = await Post.findByPk(postId);
    try {
      if(!userExist){
        throw res.status(404).send("Usuario no existe")
      }
      if(!postExist){
        throw res.status(404).send("Publicación no existe")
      }
      const post = await Post.findOne({ where: { id: postId, User_id: id } });
      if(!post){
        throw res.status(400).send("Usuario incorrecto");
      }
      await post.update(newPost);
      res.status(200).send("Post data has been updated.");
    } catch (error) {
      res.status(500).send("An error has occurred with the server.");
    }
  };

exports.deletePost = async (req, res) => {
  const { user } = req.user;
  const { id } = user; 
  const userExist = await User.findByPk(id);

  const postId = req.params.id;
  const postExist = await Post.findByPk(postId);
  
  try {
    if(!userExist){
      throw res.status(404).send("Usuario no existe")
    }
    if(!postExist){
      throw res.status(404).send("Publicación no existe")
    }
    await Post.destroy({ where: { id: postId, User_id: id } });
    res.status(200).send("Post has been deleted.");
  } catch (error) {
    res.status(500).send(error);
  }
};