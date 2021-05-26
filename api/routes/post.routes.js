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

router.get(
  "/userposts/:id",
  authMiddleware,
  postController.get
);

router.get("/userposts/:id", authMiddleware, postController.getProfilePostById);
router.get("/allusers" , authMiddleware, postController.AllUsers);

router.get("/allpost" , authMiddleware, postController.AllPost);

module.exports = router;
