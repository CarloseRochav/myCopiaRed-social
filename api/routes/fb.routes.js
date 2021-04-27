const passport = require('passport');
const fbStrategy = passport.authenticate('facebook');
const express = require('express');
const { AppStream } = require('aws-sdk');
const router = express.Router();


const callback={
    successRedirect: "/fb/success",
    failureRedirect: "/fb/failure"
}

router.get("/fb",fbStrategy);//Auth fb

router.get("/fb/callback",
        passport.authenticate("facebook",callback));//callback route

router.get("/fb/success",(req,res)=>{
        res.send("FB LOGIN EXITOSO");
})

router.get("/fb/failure",(req,res)=>{
        res.send("FALLO la auth");

})

module.exports = router;




