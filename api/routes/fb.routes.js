const passport = require('passport');
//const fbStrategy = passport.authenticate('facebook',{scope:['email','profile']});
const fbStrategy = passport.authenticate('facebook');
const express = require('express');
const router = express.Router();
const { authController,googleFacebookController } = require("../controllers");


const callback={
    successRedirect: "/fb/success",
    failureRedirect: "/fb/failure"
}

router.get("/auth/fb",fbStrategy);//Auth fb

router.get("/fb/callback",
        passport.authenticate("facebook",callback));//callback route


router.get('/fb/success',googleFacebookController.facebookController);

router.get("/fb/failure",(req,res)=>{
        res.send("FALLO la auth");

})

router.post("/gfb/verify",googleFacebookController.verifyUser);


module.exports = router;




