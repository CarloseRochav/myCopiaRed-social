const express = require("express");
const router = express.Router();
const { followersController } = require("../controllers");
const { authMiddleware } = require("../middlewares");

//Vista generada en una publicacion
router.post("/view/:id", authMiddleware, followersController.postFollow);

module.exports = router;
