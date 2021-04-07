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

router.put(
  "/comment/:idcomment/:idpost",
  authMiddleware,
  commentController.updateComments
);

router.delete("/comment/:id", authMiddleware, commentController.deleteComments);

module.exports = router;
