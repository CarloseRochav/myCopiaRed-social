const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { userController } = require("../controllers");

router.get("/usuarios", userController.getUsers);

router.get("/usuarios/:id", userController.getUserById);

router.post(
  "/usuarios/nuevo",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("picture", "Agrega una imagen"),
    check("birth", "La fecha de nacimiento obligatorio").not().isEmpty(),
    check("email", "Agrega un correo valido").isEmail(),
    check("phone", "Agrega un telefono valido"),
    check("address", "Agrega una direccion"),
    check("roll", "El roll es obligatorio").not().isEmpty(),
  ],
  userController.createUser
);

router.post("/usuarios/:id");

router.put("/usuarios/:id", userController.updateUser);

router.delete("/usuarios/:id", userController.deleteUser);

module.exports = router;
