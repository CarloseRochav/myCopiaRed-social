const express = require("express");
const router = express.Router();
const { userController } = require("../controllers");
const { authMiddleware } = require("../middlewares");
const {transporter,mailOptions} = require("../controllers/nodeMailer");



router.get("/usuarios", userController.getUsers);

router.get("/usuarios/:id", userController.getUserById);

router.put("/usuarios/:id", userController.updateUser);

router.delete("/usuarios/:id", userController.deleteUser);

//Para pruebas con nodeMailer
router.get("/send-email",(req,res)=>{transporter.sendMail(mailOptions,(err,inf)=>{
        if(err){
          console.log(`Existe un error de tipo ${err}`);
        }
        else{
          console.log("Mail enviado de manera exitosa");
          res.send("Email Enviado BRO");
        }
})});

//Perfil
router.get("/usuario/profile/:id", authMiddleware, (req, res) => {
  res.status(200).send("User Profile " + req.params.id);
});

module.exports = router;
