const express = require("express");
const router = express.Router();
const { authController } = require("../controllers");
const { authMiddleware } = require("../middlewares");
const {authService}=require('../services');
//const {oauthPassport} = require('../middlewares');
//const passport = require("passport");
//const passportGoogle = passport.authenticate("googleToken",{session:false});
//const googleOauth = passport.authenticate('google',{scope:['profile','email','openid']});

router.post("/signup", authController.signUp);

router.post("/signin", authController.signIn);

router.post("/verify/:code", authController.verifyUser);

router.put("/account/recovery", authController.sendRecoveryPassword);

router.put(
  "/account/changePassword",
  authMiddleware,
  authController.changePassword
);

router.put("/deltsa");

module.exports = router;
