const express = require("express");
const router = express.Router();
const { commentController } = require("../controllers");
const { authMiddleware } = require("../middlewares");

router.get("/comment", authMiddleware, commentController.getComments);

router.post(
  "/comment/:idpost",
  authMiddleware,
  commentController.createComments
);

router.get("/comment/:id", authMiddleware, commentController.getCommentsById);

router.put(
  "/comment/:idcomment/:idpost",
  authMiddleware,
  commentController.updateComments
);

router.get(
  "/commentsbypost/:id",
  authMiddleware,
  commentController.getCommentsByPostId
);

router.delete("/comment/:id", authMiddleware, commentController.deleteComments);

module.exports = router;
