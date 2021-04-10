const { AccessAnalyzer } = require('aws-sdk');
const passport = require('passport');
//const facebookStrategyTK = require('passport-facebook-token');
const googlePlusTokenStrategy = require('passport-google-plus-token');
const {User,usersGoogle}=require('../models')

// const facebook={
//     fbClientId:FB_OAUTH_CLIENT,
//     fbSecret:FB_OAUTH_SECRET
// }
// passport.use=()=>{

// }

//Google Token Strategy

passport.use("googleToken",new googlePlusTokenStrategy({
    clientID:process.env.GOOGLE_CLIENTID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
},async(accessToken,refreshToken,profile,done)=>{
    console.log("accessToken",accessToken);
    console.log("refreshToken",refreshToken);
    console.log("profile",profile);
    console.log("id de usuario google : ",profile.id);
    console.log("Nombres : ",profile.name.givenName);
    console.log("Apellidos : ",profile.name.familyName);    
    console.log("Email : ",profile.emails[0].value);
    console.log("imageURL : ",profile.photos[0].value);

    
    const idPro = parseInt(profile.id)
    
    const userExist =await User.findOne(
        {
            where:{idGoogle:idPro}
        }
        )
    
    
    if(userExist){
        return( done(null,false),
            console.log("Este correo ya esta registrado"))
    }

    if(!userExist){

        console.log("Este usuario no existe")
        //console.log(`El tipo de dato de ${idPro} es : ${typeof(idPro)}`);
        // const newUser = new User(
        //     {
        //         idGoogle:profile.id
        //         name:profile.name.givenName ,
        //         password: "benito123",
        //         picture: profile.photos[0].value,
        //         birth: "04/11/1999",
        //         email: profile.emails[0].value,
        //         phone:6641275239,
        //         address: "Centro",
        //         role:4
        //     }
        // )
    }


}))