const express = require("express");
const router = express.Router();
const { commentController } = require("../controllers");
const { authMiddleware } = require("../middlewares");

router.get("/coment", authMiddleware, commentController.getComments);

router.post("/comments", authMiddleware, commentController.createComments);

router.get("/comment/:id", authMiddleware, commentController.getCommentsById);

router.put("/comment/:id", authMiddleware, commentController.updateComments);

router.delete("/comment/:id", authMiddleware, commentController.deleteComments);
  



module.exports = router;