const express = require("express");
const router = express.Router();
const { authController } = require("../controllers");
const { authMiddleware } = require("../middlewares");
const {authService}=require('../services');
//const {oauthPassport} = require('../middlewares');
const passport = require("passport");
const passportGoogle = passport.authenticate("googleToken",{session:false});
const googleOauth = passport.authenticate("googleOauth",{session:false});

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
// router.post(
//   "/signup/google",
//   passportGoogle,(req,es)=>{console.log(req.user)},
//   authService.googleToken);//Dada de alta

//Token Goggle Oauth
router.post(
  "/signup/google",
  googleOauth,(req,res)=>{console.log(req.user)},
  authService.googleToken);//Dada de alta


//router.post("/auth/facebook",passport.authenticate("facebookToken",{session:false}));

module.exports = router;
