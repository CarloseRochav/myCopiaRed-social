const { Post, User, Reaccions } = require("../models");
const { customError, getPagination, getPagingData } = require("../helpers");

exports.getPosts = async (page, size, id) => {
  const { limit, offset } = getPagination(page, size);

  const posts = await Post.findAndCountAll({
    subQuery: false,
    attributes: [
      ["id", "idPost"],
      "title",
      "description",
      "thumbnail",
      "video",
      "createdAt",
      "commentsCount",
      "reactionsCount",
    ],
    limit: limit,
    offset: offset,
    include: [
      { model: User, attributes: ["id", "name", "picture"] },
      {
        model: Reaccions,
        attributes: [["User_id", "like_by_user"]],
        where: {
          "$Reaccions.User_id$": id,
        },
        required: false,
      },
    ],
  });

  const responsePost = getPagingData(posts, page, limit);
  return responsePost;
};

exports.getPostById = async (postId) => {
  const post = await this.postExist(postId);
  return post;
};

exports.getAllUserPostsById = async (userId, page, size) => {
  const { limit, offset } = getPagination(page, size);

  const posts = await Post.findAndCountAll({
    subQuery: false,
    attributes: [
      ["id", "idPost"],
      "title",
      "description",
      "thumbnail",
      "video",
      "createdAt",
      "commentsCount",
      "reactionsCount",
    ],
    limit: limit,
    offset: offset,
    include: [
      { model: User, attributes: ["id", "name", "picture"] },
      {
        model: Reaccions,
        attributes: [["User_id", "like_by_user"]],
        where: {
          "$Reaccions.User_id$": userId,
        },
        required: false,
      },
    ],
    where: { User_id: userId },
  });
  const responsePost = getPagingData(posts, page, limit);
  return responsePost;
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

exports.addReaction = async (_idPost) => {
  const post = await this.postExist(_idPost);
  const comment = post.reactionsCount + 1;
  await post.update({
    reactionsCount: comment,
  });
};

exports.removeReaction = async (_idPost) => {
  const post = await this.postExist(_idPost);
  const comment = post.reactionsCount - 1;
  await post.update({
    reactionsCount: comment,
  });
};

exports.addComment = async (_idPost) => {
  const post = await this.postExist(_idPost);
  const comment = post.commentsCount + 1;
  await post.update({
    commentsCount: comment,
  });
};

exports.removeComment = async (_idPost) => {
  const post = await this.postExist(_idPost);
  const comment = post.commentsCount - 1;
  await post.update({
    commentsCount: comment,
  });
};
