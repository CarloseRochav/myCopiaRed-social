const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { userController } = require("../controllers");
const bodyParser = require('body-parser');

//Uso de bodyP
router.use(bodyParser.urlencoded({ extended: false })); //parse application/x-www-form-urlenconded
router.use(bodyParser.json()); //parse applicarion/json

router.get("/usuarios", userController.getUsers);

router.get("/usuarios/:id", userController.getUserById);

router.post(
  "/usuarios/nuevo",(req,res)=>{
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("picture", "Agrega una imagen"),
    check("birth", "La fecha de nacimiento obligatorio").not().isEmpty(),
    check("email", "Agrega un correo valido").isEmail(),
    check("phone", "Agrega un telefono valido"),
    check("adress", "Agrega una direccion"),
    check("roll", "El roll es obligatorio").not().isEmpty(),
  ],console.log(req.body),
  userController.createUser}
);

router.post("/usuarios/:id");

router.put("/usuarios/:id",[
  check("name","No puede quedar vacio el nombre").not().notEmpty(),
  check("picture","No olvides tu foto"),
  check("birth","No puedes dejar este campo vacio").notEmpty.isEmpty(),
  check("email","Recuerda que sea un correo valido").isEmail(),
  check("phone","Asegurate que tu numero sea correcto"),
  check("adress","Asegurate que sea una direccion valida"),
  check("roll","Selecciona un roll").not.notEmpty(),

], userController.updateUser);

router.delete("/usuarios/:id", userController.deleteUser);

module.exports = router;
