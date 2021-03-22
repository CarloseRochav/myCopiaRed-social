const express = require("express");
const router = express.Router();
const { postController } = require("../controllers");
const { authMiddleware } = require("../middlewares");

router.get("/post", authMiddleware, postController.getPost);

router.post("/post", authMiddleware, postController.createPost);

router.get("/post/:id", authMiddleware, postController.getPostById);

router.put("/post/:id", authMiddleware, postController.updatePost);

router.delete("/post/:id", authMiddleware, postController.deletePost);
  



module.exports = router;