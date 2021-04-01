const express = require("express");
const router = express.Router();

const { userController } = require("../controllers");
const { authMiddleware, uploadMiddleware } = require("../middlewares");

router.get("/usuarios", userController.getUsers);

router.get("/usuarios/:id", userController.getUserById);

router.put("/usuarios/:id", userController.updateUser);

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

router.post("/getobject",authMiddleware,userController.getAnObject);
//Ruta de prueba con s3
router.get("/getAll",userController.getAllObjects);
//Ruta de prueba con s3

module.exports = router;
