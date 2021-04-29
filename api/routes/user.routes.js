const express = require("express");
const router = express.Router();

const { userController } = require("../controllers");
const { authMiddleware, uploadMiddleware } = require("../middlewares");

router.get("/usuarios", userController.getUsers);

router.delete("/usuarios/:id", userController.deleteUser);

//  Perfil
router.get("/usuario/myprofile", authMiddleware, userController.getUserByJWT);

router.put("/usuario/update", authMiddleware, userController.updateUserByJWT);

router.post(
  "/usuarios/profilephoto",
  authMiddleware,
  uploadMiddleware,
  userController.updateImageProfileUser
);

router.post(
  "/usuarios/profilebackgroundphoto",
  authMiddleware,
  uploadMiddleware,
  userController.updateImageBackgroundProfileUser
);

//Interaccion con otros usuarios.
router.post("/blacklist/:id", authMiddleware, userController.Blacklist);
router.get("/usuario/:id", authMiddleware, userController.getAUserByJWT);

module.exports = router;
