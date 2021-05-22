const express = require("express");
const router = express.Router();
const { followersController } = require("../controllers");
const { authMiddleware } = require("../middlewares");

//Usuario Siguiendo a otro
router.post("/follow/:id", authMiddleware, followersController.postFollow);
//Usuario Dejando de Seguir a otro
router.delete("/follow/:id", authMiddleware, followersController.deleteFollow);
//Total de Seguidores de un usuario
router.get(
  "/totalfollowers/:id",
  authMiddleware,
  followersController.totalCountFollowers
);
//Ver todos los Seguidores de un usuario
router.get(
  "/allfollowers/:id",
  authMiddleware,
  followersController.totalFollowers
);

module.exports = router;
