const { Post } = require("../models");
const { customError } = require("../helpers");

exports.getPosts = async () => {
  const posts = await Post.findAll();
  if (!posts || !posts.length) {
    throw customError(404, "No hay publicaciones en la base de datos");
  }
  return posts;
};

exports.getPostById = async (postId) => {
  const post = await this.postExist(postId);
  return post;
};

exports.getAllUserPostsById = async (userId) => {
  const posts = await Post.findAll({ where: { User_id: userId } });
  if (!posts || !posts.length) {
    throw customError(404, "Este usuario no tiene publicaciones");
  }
  return posts;
};

exports.updatePost = async (_idUser, _idPost, body) => {
  const post = await Post.findOne({ where: { id: _idPost, User_id: _idUser } });
  if (!post) {
    throw res.status(400).json({ code: 400, message: "Usuario Incorrecto" });
  }
  await post.update(body);
  return post;
};

exports.postExist = async (_postId) => {
  const postId = parseInt(_postId);
  const post = await Post.findOne({ where: { id: postId ? postId : -10 } });
  if (!post) {
    throw customError(404, "La publicacion no existe");
  }
  return post;
};

exports.deletePost = async (_idUser, _idPost) => {
  const destroy = await Post.destroy({
    where: { id: _idPost, User_id: _idUser },
  });
  return destroy;
};
