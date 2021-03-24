const { formatMessage } = require("../helpers");
const { Post, User, Comments } = require("../models");

//cambie User por Post para adapaptarlo
exports.getComments = async (req, res) => {
  try {
    const comments = await Post.findAll();
    res.status(200).send(comments);
  } catch (error) {
    res.status(500).send("An error has occurred with the server.");
  }
};

exports.createComments = async (req, res) => {
  const { user } = req.user;
  const { id } = user;
  const  userExist = await User.findByPk(id);

  const postId = req.body.idPost
  const postExist =await Post.findByPk(postId);

  try { 
    if(!userExist){
      throw res.status(404).send("Usuario no existe");
    }
    if(!postExist){
        throw res.status(404).send("Publicación no existe");
    }
    await Post.create({
      commnent: req.body.commnent,
      User_id: id,
      //falta el id del post.
    });
    res.status(201).send("Comentario creado exitosamente ");

  } catch (error) {
    res.status(500).send(error);  
  }
};

exports.getCommentsById = async (req, res) => {
  const commentId = req.params.id;
  try {
    const comment = await Post.findOne({ where: { id: commentId } });
    res.status(200).send(comment);
  } catch (error) {
    res.status(500).send("An error has occurred with the server.");
  }
};


exports.updateComments = async (req, res) => {
  const { user } = req.user;
  const { id } = user; 
  const userExist = await User.findByPk(id);

  const postId  = req.body.idPost;
  const postExist = await Post.findByPk(postId);

  const commentId = req.params.id;
  const newComment = req.body;
  const commentExist = await Comment.findByPk(commentId);

    try {
      if(!userExist){
        throw res.status(404).send("Usuario no existe")
      }
      if(!postExist){
        throw res.status(404).send("Publicación no existe")
      }
      if(!commentExist){
        throw res.status(404).send("Comentario no existe")
      }
      const comment = await Post.findOne({ where: {id: commentId, id: postId, User_id: id } });
      if( !comment ){
        throw res.status(400).send("Comentario incorrecto");
      }
      await comment.update( newComment );
      res.status(200).send("Comment data has been updated.");
    } catch (error) {
      res.status(500).send("An error has occurred with the server.");
    }
  };

exports.deleteComments = async (req, res) => {
  const { user } = req.user;
  const { id } = user; 
  const userExist = await User.findByPk(id);

  const postId = req.body.idPost;
  const postExist = await Post.findByPk(postId);
  
  const commentId = req.params.id;
  const commentExist = await Comment.findByPk(commentId);
  try {
    if(!userExist){
      throw res.status(404).send("Usuario no existe")
    }
    if(!postExist){
      throw res.status(404).send("Publicación no existe")
    }
    if(!commentExist){
        throw res.status(404).send("Comentario no existe")
      }
    await Comment.destroy({ where: {id: commentId,  id: postId, User_id: id } });
    res.status(200).send("Comment has been deleted.");
  } catch (error) {
    res.status(500).send(error);
  }
};