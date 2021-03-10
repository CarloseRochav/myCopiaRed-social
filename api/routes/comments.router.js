const express = require("express");
const router = express.Router();
const { commentController } = require("../controllers");

router.get("/comment", commentController.getComments);

router.get("/comment/:id", commentController.getCommentsById);

router.put("/comment/:id", commentController.updateComments);

router.delete("/comment/:id", commentController.deleteComments);
  

module.exports = router;