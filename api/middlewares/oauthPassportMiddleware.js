const passport = require('passport');
//const googlePlusTokenStrategy = require('passport-google-plus-token');
const googleStrategy= require('passport-google-oauth2').Strategy;//Nueva libreria para google
const fbStrategy = require('passport-facebook').Strategy;//FB Strategy
const {Users}=require('../../database/models')
const {generateNewPassword,hashPassword,randomNumber,googleToken}=require('../services/authService');
//const{mailerService,userService}=require('../services');
const{GOOGLE_OAUTH_ID,GOOGLE_OAUTH_KEY,FB_CLIENT,FB_SECRET}=require('../../config/enviromentVars');


// const secret="a00075b052d1125a82671249617a4979";
// const idfb="502440277579161";
//Autentificacion con FACEBOOK
passport.use(new fbStrategy({
    clientID:FB_CLIENT,
    clientSecret:FB_SECRET,
    callbackURL:"http://localhost:8080/fb/callback",
    //callbackURL:"https://damp-beyond-72658.herokuapp.com/fb/callback",
    profileFields: ['id', 'displayName', 'name', 'emails','picture']//Super importante indicar los cambos que vamos a necesitar
        
},async(accessToken,refreshToken,profile,done)=>{

    //const { email, firnst_name, last_name } = profile._json;
    
    console.log(profile);
    done(null,profile);
    // const userData = {
    //   email,
    //   firstName: first_name,
    //   lastName: last_name

    // }

}))


// const clientID="576226805449-6u4o7ci9gia18vbk0ositqgfks9cm5i9.apps.googleusercontent.com";
// const secretKey="Nfwlp91QUqVChsaJFtqM8eEK";

passport.serializeUser(function(user,done){
    done(null,user);
});

passport.deserializeUser(function(user,done){
    done(null,user);
});


passport.use(new googleStrategy({
        clientID:GOOGLE_OAUTH_ID,
        clientSecret:GOOGLE_OAUTH_KEY,
        callbackURL: 'http://localhost:8080/google/callback',
        //callbackURL: 'https://damp-beyond-72658.herokuapp.com/google/callback',  
        passReqToCallback: true
    },(req,accessToken, refreshToken, profile, done) =>{

        //console.log("PERFIL",profile);
        return done(null, profile);
        
    }
    ));

