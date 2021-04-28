const {
  Posts,
  Users,
  Reactions,
  Categories,
} = require("../../database/models");
const { customError, getPagination, getPagingData } = require("../helpers");

exports.getPosts = async (page, size, id) => {
  const { limit, offset } = getPagination(page, size);

  const posts = await Posts.findAndCountAll({
    subQuery: false,
    attributes: [
      ["id", "idPost"],
      "title",
      "description",
      "thumbnail",
      "video",
      "createdAt",
      "latitude",
      "longitude",
      "commentsCount",
      "reactionsCount",
      "Categories_id",
    ],
    limit: limit,
    offset: offset,
    include: [
      { model: Users, attributes: ["id", "name", "picture"] },
      {
        model: Reactions,
        attributes: [["Users_id", "like_by_user"]],
        where: {
          Users_id: id,
        },
        required: false,
      },
      {
        model: Categories,
        attributes: ["name", "picture", "description"],
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

  const posts = await Posts.findAndCountAll({
    subQuery: false,
    attributes: [
      ["id", "idPost"],
      "title",
      "description",
      "thumbnail",
      "video",
      "createdAt",
      "latitude",
      "longitude",
      "commentsCount",
      "reactionsCount",
    ],
    limit: limit,
    offset: offset,
    include: [
      { model: Users, attributes: ["id", "name", "picture"] },
      {
        model: Reactions,
        attributes: [["Users_id", "like_by_user"]],
        where: {
          Users_id: userId,
        },
        required: false,
      },
      {
        model: Categories,
        attributes: ["name", "picture", "description"],
      },
    ],
    where: { Users_id: userId },
  });
  const responsePost = getPagingData(posts, page, limit);
  return responsePost;
};

exports.updatePost = async (_idUser, _idPost, body) => {
  const post = await Posts.findOne({
    where: { id: _idPost, Users_id: _idUser },
  });
  if (!post) {
    throw res.status(400).json({ code: 400, message: "Usuario Incorrecto" });
  }
  await post.update(body);
  return post;
};

exports.postExist = async (_postId) => {
  const postId = parseInt(_postId);
  const post = await Posts.findOne({ where: { id: postId ? postId : -10 } });
  if (!post) {
    throw customError(404, "La publicacion no existe");
  }
  return post;
};

exports.deletePost = async (_idUser, _idPost) => {
  const destroy = await Posts.destroy({
    where: { id: _idPost, Users_id: _idUser },
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

exports.getAllUserPostsByIdfromuser = async (userId, profileid, page, size) => {
  const { limit, offset } = getPagination(page, size);

  const posts = await Posts.findAndCountAll({
    subQuery: false,
    attributes: [
      ["id", "idPost"],
      "title",
      "description",
      "thumbnail",
      "video",
      "createdAt",
      "latitude",
      "longitude",
      "commentsCount",
      "reactionsCount",
    ],
    limit: limit,
    offset: offset,
    include: [
      { model: Users, attributes: ["id", "name", "picture"] },
      {
        model: Reactions,
        attributes: [["Users_id", "like_by_user"]],
        where: {
          Users_id: userId,
        },
        required: false,
      },
      {
        model: Categories,
        attributes: ["name", "picture", "description"],
      },
    ],
    where: { Users_id: profileid },
  });
  const responsePost = getPagingData(posts, page, limit);
  return responsePost;
};
