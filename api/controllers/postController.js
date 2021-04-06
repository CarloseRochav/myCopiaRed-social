const { s3Service, postService, userService } = require("../services");

exports.getPost = async (req, res) => {
  try {
    const posts = await postService.getPosts();
    return res.status(200).json({ code: 200, msg: posts });
  } catch (error) {
    return res
      .status(error.code ? error.code : 500)
      .json(
        error.message ? { code: 500, msg: error.errors[0].message } : error
      );
  }
};

exports.getPostById = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await postService.getPostById(postId);
    return res.status(200).json({ code: 200, msg: post });
  } catch (error) {
    return res
      .status(error.code ? error.code : 500)
      .json(
        error.message ? { code: 500, msg: error.errors[0].message } : error
      );
  }
};

exports.updatePost = async (req, res) => {
  const { user } = req.user;
  const { id } = user;
  const postId = req.params.id;
  const body = req.body;

  try {
    await userService.userExist(id);
    await postService.postExist(postId);
    await postService.updatePost(id, postId, body);
    return res
      .status(200)
      .json({ code: 200, msg: "La publicacion ha sido actualizada" });
  } catch (error) {
    return res
      .status(error.code ? error.code : 500)
      .json(
        error.message ? { code: 500, msg: error.errors[0].message } : error
      );
  }
};

exports.deletePost = async (req, res) => {
  const { user } = req.user;
  const { id } = user;
  const postId = req.params.id;
  try {
    await userService.userExist(id);
    await postService.postExist(postId);
    await postService.deletePost(id, postId);
    return res
      .status(200)
      .json({ code: 200, msg: "La publicacion ha sido borrada" });
  } catch (error) {
    return res
      .status(error.code ? error.code : 500)
      .json(
        error.message ? { code: 500, msg: error.errors[0].message } : error
      );
  }
};

exports.createPost = async (req, res) => {
  const { user } = req.user;
  const { id } = user;
  const myFile = req.file.originalname.split(".");
  const fileType = myFile[myFile.length - 1];
  const buffer = req.file.buffer;
  try {
    await userService.userExist(id);
    await s3Service.uploadVideo(fileType, buffer, id);
    return res
      .status(200)
      .json({ code: 200, msg: "La publicacion ha sido creada exitosamente" });
  } catch (error) {
    return res
      .status(error.code ? error.code : 500)
      .json(
        error.message ? { code: 500, msg: error.errors[0].message } : error
      );
  }
};

exports.getProfilePostById = async (req, res) => {
  const userId = req.params.id;
  try {
    await userService.userExist(userId);
    const posts = await postService.getAllUserPostsById(userId);
    return res.status(200).json({ code: 200, msg: posts });
  } catch (error) {
    return res
      .status(error.code ? error.code : 500)
      .json(
        error.message ? { code: 500, msg: error.errors[0].message } : error
      );
  }
};

exports.getProfilePostByJWT = async (req, res) => {
  const { user } = req.user;
  const { id } = user;
  try {
    await userService.userExist(id);
    const posts = await postService.getAllUserPostsById(id);
    return res.status(200).json({ code: 200, msg: posts });
  } catch (error) {
    return res
      .status(error.code ? error.code : 500)
      .json(
        error.message ? { code: 500, msg: error.errors[0].message } : error
      );
  }
};
