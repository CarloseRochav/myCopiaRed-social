const {User}=require('../models');
const {generateNewPassword,hashPassword,randomNumber,googleToken}=require('../services/authService');
const {authService}=require('../services')


exports.googleController = async (req,res,next)=>{

    const user=req.user;
    //console.log("PROFILE : ",req.user);
    console.log("id de usuario google : ",user.id);
    res.send("EXITO");
    console.log("Nombres : ",user.name.givenName);
    console.log("Apellidos : ",user.name.familyName);    
    console.log("Email : ",user.emails[0].value);
    console.log("imageURL : ",user.photos[0].value);    
    console.log(`FULLNAME : ${user.displayName} Tipo : ${typeof(user.displayName)}`);
    console.log(`Sin ESPACIOS ${user.name.givenName.replace(/[\s+.]/g, '')}`);

    
    const googleGivenName = user.name.givenName.replace(/[\s+.]/gi, '');//Reemplaza puntos y espacios, suprime
    const randomPass =generateNewPassword();
    const hashPass=hashPassword(randomPass);
    const randomNum = randomNumber();

    

    const userExist = await User.findOne({where:{idGoogle:user.id}});   

    try{
    if(!userExist){
        
        const newUser =//Objeto del usuario
            {
                idGoogle:user.id,
                name:googleGivenName,
                password: hashPass,
                picture: user.photos[0].value,
                birth: "01/01/2000",
                email: user.emails[0].value,
                phone:6633455454,
                address: "Centro",
                role_id:4,
                noConfirmation: randomNum
            }
        

        await User.create(newUser);
        console.log("Usuario creado exitosamente",newUser);        
        const userNew = User.findOne({where:{idGoogle:newUser.idGoogle}});
        //req.user=userNew; //No hace falta
        //return done(200,"Registro exitoso")


        return next();
        
     }
     if(userExist){

        const usuario = userExist;
        
        const googleUser={
            id:usuario.id,
            names:usuario.name,
            email:usuario.email,
            password:usuario.password,     
            role:usuario.role_id     
        }

        
        console.log("Este usuario ya esta registrado", googleUser);                   
        //req.user=googleUser;    //No hace falta 

        const token = await authService.googleToken(usuario.id,usuario.password,usuario.email,usuario.role);       
    
        // res.send.json({
        //     Mensaje:" Usuario loggeado",
        //     Token:token
        // })
        
        res.json({token:token});
     }   

     //return next();

} 
catch(err){
    return console.log(err,false,err.message);
    }
}