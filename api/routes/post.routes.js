const express = require("express");
const router = express.Router();
const { postController } = require("../controllers");

router.get("/post", postController.getPost);

router.get("/post/:id", postController.createPost);

router.get("/post/:id", postController.getPostById);

router.put("/post/:id", postController.updatePost);

router.delete("/post/:id", postController.deletePost);
  

module.exports = router;