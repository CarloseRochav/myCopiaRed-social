const express = require("express");
const router = express.Router();
const { authController } = require("../controllers");
const { authMiddleware } = require("../middlewares");
//const {oauthPassport} = require('../middlewares');
const passport = require("passport");
const passportGoogleSignUp = passport.authenticate("googleTokenSignUp",{session:false});

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
router.post("/signup/google",passportGoogleSignUp);//Dada de alta
//router.post("/singin/Google",passportGoogle,);//Generacion de token
router.post("/auth/facebook",passport.authenticate("facebookToken",{session:false}));

module.exports = router;
