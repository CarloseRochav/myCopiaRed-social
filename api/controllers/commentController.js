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

  const postId = req.params.idpost;
  const postExist = await Post.findByPk(postId);

  try { 
    if(!userExist){
      throw res.status(404).send("Usuario no exist");
      
    }
    if(!postExist){
        throw res.status(404).send("Publicación no existe");
    }
    await Comments.create({
      comment: req.body.comment,
      User_id: id,
      Post_id: postId,

      
    });
    res.status(201).send("Comentario creado exitosamente ");

  } catch (error) {
    res.status(500).send(error);  
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
  const { user } = req.user;
  const { id } = user; 
  const userExist = await User.findByPk(id);

  const postId  = req.params.idpost;
  const postExist = await Post.findByPk(postId);

  const commentId = req.params.idcomment;
  const newComment = req.body;
  const commentExist = await Comments.findByPk(commentId);

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
     await Comments.update({comment:  newComment.comment}, { where: {id: commentId, Post_id: postId, User_id: id } });
      
      res.status(200).send("Comment data has been updated.");
    } catch (error) {
      res.status(500).send("An error has occurred with the server.");
    }
  };

exports.deleteComments = async (req, res) => {
  const { user } = req.user;
  const { id } = user; 
  const userExist = await User.findByPk(id);

  const postId = req.params.idpost;
  const postExist = await Comments.findByPk(postId);
  
  const commentId = req.params.idcomment;
  const commentExist = await Comments.findByPk(commentId);
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
    await Comments.destroy({ where: {id: commentId,  Post_id: postId, User_id: id } });
    res.status(200).send("Comment has been deleted.");
  } catch (error) {
    res.status(500).send(error);
  }
};