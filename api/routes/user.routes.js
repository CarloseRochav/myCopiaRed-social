const express = require("express");
const router = express.Router();
const { userController } = require("../controllers");
const { authMiddleware } = require("../middlewares");

router.get("/usuarios", userController.getUsers);

router.get("/usuarios/:id", userController.getUserById);

router.put("/usuarios/:id", userController.updateUser);

router.delete("/usuarios/:id", userController.deleteUser);

//Perfil
router.get("/usuario/profile/:id", authMiddleware, (req, res) => {
  res.status(200).send("User Profile " + req.params.id);
});

module.exports = router;
