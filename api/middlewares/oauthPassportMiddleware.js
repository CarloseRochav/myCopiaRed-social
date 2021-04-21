const passport = require('passport');
const facebookTokenStrategy = require('passport-facebook-token');
//const googlePlusTokenStrategy = require('passport-google-plus-token');
const googleOauth= require('passport-google-oauth20').Strategy;//Nueva libreria para google
const {User}=require('../models')
const {generateNewPassword,hashPassword,randomNumber,googleToken}=require('../services/authService');
const{mailerService,userService}=require('../services');
const{GOOGLE_CLIENT,GOOGLE_SECRET_KEY}=require('../../config/enviromentVars')

//Autentificacion con FACEBOOK
passport.use('facebookToken',new facebookTokenStrategy({
    clientID:process.env.FB_CLIENTID,
    clientSecret:process.env.FB_APP_SECRECT,
},async(accessToken,refreshToken,profile,done)=>{

    console.log("Profile ID : ",profile.id);
    console.log("Name : ",profile.displayName);
    console.log("Email : ",profile.emails[0].value);
    console.log("Profile : ",profile.photos[0].value);

    const idPro =parseInt(profile.id);
    const userExist = await User.findOne(
        {
            where:{idFacebook:idPro}
        }
    )

    if(userExist){
        return (
            done(null,false),
                console.log("Correo ya registrado")
        );
    }

    if(!userExist){

        console.log("Este usuario no esta registrado");
        console.log(`El tipo de dato de ${idPro} es : ${typeof(idPro)}`);
        
        const randomPass= generateNewPassword();//Generacion de contraseña random
        const hashPass= hashPassword(randomPass);//Encriptacion de contraseña
        const randomNum = randomNumber();

        const newUser = new User(
            {
                idFacebook:profile.id,
                name:profile.displayName ,
                password: hashPass,
                picture: profile.photos[0].value,
                birth: "01/01/2000",
                email: profile.emails[0].value,
                phone:6633455454,
                address: "Centro",
                role_id:4,
                noConfirmation: randomNum
            }
        )
        try{
        await User.create(newUser)
        await mailerService.sendConfirmEmail(newUser.email,randomNum);
        return res
            .status(200)
            .json({code:200,msg:"Usuario Creado"});            
        }
        catch(error){
            return res
                .status(error.code?error.code:500)
                .json(error.message?{code:500,msg:error.message}:error);
        }
    }  

}) )


//EL middleware difinitivo GOOGLE
// passport.use("googleToken", new googlePlusTokenStrategy({
//     clientID:GOOGLE_CLIENT,
//     clientSecret:GOOGLE_SECRET_KEY,
//     passReqToCallback: true
// },async(req,refreshToken,accessToken,profile,next)=>{

//     console.log("PROFILE : ",profile);
//     console.log("id de usuario google : ",profile.id);
//     console.log("Nombres : ",profile.name.givenName);
//     console.log("Apellidos : ",profile.name.familyName);    
//     console.log("Email : ",profile.emails[0].value);
//     console.log("imageURL : ",profile.photos[0].value);    
//     // console.log(`FULLNAME : ${profile.displayName} Tipo : ${typeof(profile.displayName)}`);
//     // console.log(`Sin ESPACIOS ${profile.displayName.replace(/\s+/g, '')}`);

//     const googleGivenName = profile.name.givenName.replace(/\s+/g, '');
//     const randomPass =generateNewPassword();
//     const hashPass=hashPassword(randomPass);
//     const randomNum = randomNumber();

//     const userExist = await User.findOne({where:{idGoogle:profile.id}});   

//     try{
//     if(!userExist){
        
//         const newUser =//Objeto del usuario
//             {
//                 idGoogle:profile.id,
//                 name:googleGivenName,
//                 password: hashPass,
//                 picture: profile.photos[0].value,
//                 birth: "01/01/2000",
//                 email: profile.emails[0].value,
//                 phone:6633455454,
//                 address: "Centro",
//                 role_id:4,
//                 noConfirmation: randomNum
//             }
        

//         await User.create(newUser);
//         console.log("Usuario creado exitosamente",newUser);        
//         const userNew = User.findOne({where:{idGoogle:newUser.idGoogle}});
//         req.user=userNew;
//         return done(200,"Registro exitoso")
//         //return next();
        
//     }
//     if(userExist){

//         const usuario = userExist.dataValues;
        
//         const googleUser={
//             id:usuario.id,
//             names:usuario.name,
//             email:usuario.email,
//             password:usuario.password,     
//             role:usuario.role_id     
//         }

        
//         console.log("Este usuario ya esta registrado", googleUser);                   
//         //req.user=googleUser;        
//         //return next();
//         return done(200, "Usuario ya registrado")
//         //next();
//     }   

//     return next();

// } 
// catch(err){
//     return console.log(err,false,err.message);
// }

//}))
passport.use("googleOauth", new googleOauth({
    clientID:GOOGLE_CLIENT,
    clientSecret:GOOGLE_SECRET_KEY,
    passReqToCallback: true
},async(req,refreshToken,accessToken,profile,next,done)=>{

    console.log("PROFILE : ",profile);
    console.log("id de usuario google : ",profile.id);
    console.log("Nombres : ",profile.name.givenName);
    console.log("Apellidos : ",profile.name.familyName);    
    console.log("Email : ",profile.emails[0].value);
    console.log("imageURL : ",profile.photos[0].value);    
    // console.log(`FULLNAME : ${profile.displayName} Tipo : ${typeof(profile.displayName)}`);
    // console.log(`Sin ESPACIOS ${profile.displayName.replace(/\s+/g, '')}`);

    const googleGivenName = profile.name.givenName.replace(/\s+/g, '');
    const randomPass =generateNewPassword();
    const hashPass=hashPassword(randomPass);
    const randomNum = randomNumber();

    const userExist = await User.findOne({where:{idGoogle:profile.id}});   

    try{
    if(!userExist){
        
        const newUser =//Objeto del usuario
            {
                idGoogle:profile.id,
                name:googleGivenName,
                password: hashPass,
                picture: profile.photos[0].value,
                birth: "01/01/2000",
                email: profile.emails[0].value,
                phone:6633455454,
                address: "Centro",
                role_id:4,
                noConfirmation: randomNum
            }
        

        await User.create(newUser);
        await console.log("Usuario creado exitosamente",newUser);        
        const userNew = User.findOne({where:{idGoogle:newUser.idGoogle}});
        req.user=userNew;
        //done(200,"Registro exitoso")
        return next();
        
    }
    if(userExist){

        const usuario = userExist.dataValues;
        
        const googleUser={
            id:usuario.id,
            names:usuario.name,
            email:usuario.email,
            password:usuario.password,     
            role:usuario.role_id     
        }

        
        await console.log("Este usuario ya esta registrado", googleUser);                   
        //req.user=googleUser;               
        //done(200, "Usuario ya registrado")
        return next();
    }   

    return next();

} 
catch(err){
    return console.log(err,false,err.message);
}

}))


