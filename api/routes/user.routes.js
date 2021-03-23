const express = require("express");
const router = express.Router();

const { userController } = require("../controllers");
const { authMiddleware, uploadMiddleware } = require("../middlewares");

router.get("/usuarios", userController.getUsers);

router.get("/usuarios/:id", userController.getUserById);

router.put("/usuarios/:id", userController.updateUser);

router.delete("/usuarios/:id", userController.deleteUser);

//  Perfil
router.get("/usuario/profile/:id", authMiddleware, (req, res) => {
  res.status(200).send("User Profile " + req.params.id);
});

router.post(
  "/usuarios/profilephoto",
  authMiddleware,
  uploadMiddleware,
  userController.updateImageProfileUser
);

router.post(
  "/usuarios/profilephoto",
  authMiddleware,
  uploadMiddleware,
  userController.updateImageBackgroundProfileUser
);

module.exports = router;
