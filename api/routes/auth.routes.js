const express = require("express");
const router = express.Router();
const { authController } = require("../controllers");
const { authMiddleware } = require("../middlewares");
//const {oauthPassport} = require('../middlewares');
const passport = require("passport");

router.post("/signup", authController.signUp);

router.post("/signin", authController.signIn);

router.post("/verify/:code", authController.verifyUser);

router.put("/account/recovery", authController.sendRecoveryPassword);

router.put(
  "/account/changePassword",
  authMiddleware,
  authController.changePassword
);

//Token Google 
router.post("/authGoogle",passport.authenticate("googleToken",{session:false}));

module.exports = router;
