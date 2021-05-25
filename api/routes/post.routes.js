const express = require("express");
const router = express.Router();
const { postController } = require("../controllers");
const { authMiddleware, uploadMiddleware } = require("../middlewares");

router.get("/post", authMiddleware, postController.getPost);

router.post(
  "/post",
  authMiddleware,
  uploadMiddleware,
  postController.createPost
);

router.get("/post/:id", postController.getPostById);

router.get(
  "/myprofile/post",
  authMiddleware,
  postController.getProfilePostByJWT
);

router.put("/post/:id", authMiddleware, postController.updatePost);

router.delete("/post/:id", authMiddleware, postController.deletePost);

//usertouser
router.get(
  "/userposts/:id",
  authMiddleware,
  postController.getProfilePostByJWTForUser
);

//Views
// Agregar vista
//Total de vistas

module.exports = router;
