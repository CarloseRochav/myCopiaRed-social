const { AccessAnalyzer } = require('aws-sdk');
const passport = require('passport');
const facebookTokenStrategy = require('passport-facebook-token');
const googlePlusTokenStrategy = require('passport-google-plus-token');
const {User}=require('../models')
const {generateNewPassword,hashPassword,randomNumber}=require('../services/authService');
const{mailerService,userService}=require('../services');


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
       
        console.log("Este correo ya esta registrado")
        try {
            const user = await userService.userIsValid(userExist.email);
            const token = authService.createToken(userExist.password, user);
            return res.status(200).json({ code: 200, msg: token });
        } catch (error) {
            return res
                .status(error.code ? error.code : 500)
                .json(error.message ? { code: 500, msg: error.message } : error);

        }        
    }

    if(!userExist){

        console.log("Este usuario no existe")
        console.log(`El tipo de dato de ${idPro} es : ${typeof(idPro)}`);

        const randomPass= generateNewPassword();//Generacion de contraseña random
        const hashPass= hashPassword(randomPass);//Encriptacion de contraseña
        const randomNum = randomNumber();
        
        const newUser = new User(
            {
                idGoogle:profile.id,
                name:profile.name.givenName ,
                password: hashPass,
                picture: profile.photos[0].value,
                birth: "01/01/1799",
                email: profile.emails[0].value,
                phone:5558881234,
                address: "null",
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
}))

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