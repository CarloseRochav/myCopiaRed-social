const express = require("express");
const router = express.Router();
const { authController,googleFacebookController } = require("../controllers");
//const { authMiddleware } = require("../middlewares");
//const {authService}=require('../services');
require('../middlewares/oauthPassportMiddleware');
//const {oauthPassport} = require('../middlewares');
const passport = require("passport");
//const passportGoogle = passport.authenticate("googleToken",{session:false});
const googleOauth = passport.authenticate('google',{scope:['profile','email']});


// Para google oauth
// const app = express();
// const session = require('express-session');
// app.use(session({secret:"cats"}));
// app.use(passport.initialize());
// app.use(passport.session());

const callback = passport.authenticate('google',{
  successRedirect:'/google/success',
  failureRedirect:'/auth/failure',
})
//-----------------------------------------------------------------------------------------------------------------------------------//

//Token Google 
// router.post(
//   "/signup/google",
//   passportGoogle,(req,es)=>{console.log(req.user)},
//   authService.googleToken);//Dada de alta

//Middleware Google
router.get(
  "auth/google",
  googleOauth);//Dada de alta

//Google Callback
router.get(
  "/google/callback",
  callback  )


router.get("/goo/success",
            isLoggedIn,
            googleFacebookController.googleController,
            (req,res)=>{console.log(`Mira que lo habeis hecho : ${req.user}`)}
  )

router.get("/goo/failure",(req,res)=>{
      console.log("Error en la matrix pa");
  })

  //Middleware si esta logg
  function isLoggedIn(req,res,next){
      req.user? next():res.sendStatus(401);
  }


//router.post("/auth/facebook",passport.authenticate("facebookToken",{session:false}));

module.exports = router;
