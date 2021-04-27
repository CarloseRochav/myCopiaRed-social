const {User}=require('../models');
const {generateNewPassword,hashPassword,randomNumber,googleToken}=require('../services/authService');
const {authService,mailerService,userService}=require('../services')


exports.googleController = async (req,res,next)=>{

    const user=req.user;
    //console.log("PROFILE : ",req.user);
    console.log("id de usuario google : ",user.id);
    //res.send("EXITO");
    console.log("Nombres : ",user.name.givenName);
    console.log("Apellidos : ",user.name.familyName);    
    console.log("Email : ",user.emails[0].value);
    console.log("imageURL : ",user.photos[0].value);    
    console.log(`FULLNAME : ${user.displayName} Tipo : ${typeof(user.displayName)}`);
    console.log(`Sin ESPACIOS ${user.name.givenName.replace(/[\s+.]/g, '')}`);

    
    const nameTranformacion = user.name.givenName.replace(/[\s+.]/gi, '');//Reemplaza puntos y espacios, suprime
    const newNameTrans=nameTranformacion.normalize("NFD").replace(/[\u0300-\u036f]/g, "");//NFD ; es la forma de normalizacion Unicode
    const randomPass =generateNewPassword();
    const hashPass=hashPassword(randomPass);
    const randomNum = randomNumber();
    
    //throw console.log("Nombre sin espacios y sin tildes :",newNameTrans);

    
    //const nameRepeat= newNameTrans+user.id;
    const userExist = await User.findOne({where:{idGoogle:user.id}});   

    try{
    if(!userExist){
        //const nameUsed = User.findOne({where:{name:newNameTrans}})
         

            const newUser =//Objeto del usuario
            {
                idGoogle:user.id,
                name:newNameTrans,
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
            await mailerService.sendConfirmEmail(newUser.email,randomNum);//Send Email

            console.log("Usuario creado exitosamente",newUser);
            //Retorna Json
            return res.json({
                code:201,
                msg:{
                    Usuario:"Usuario Credo Exitosamente",
                    Aviso:"Por favor ingrese el codigo que se la enviado",
                    Update:"Actualice sus datos"
                }
            });
        }           
        

       
        //const userNew = User.findOne({where:{idGoogle:newUser.idGoogle}});

        //req.user=userNew; //No hace falta
        //return done(200,"Registro exitoso")
     
     
     if(userExist){
      
        console.log("Este usuario ya esta registrado", userExist);  
        const user = await userService.userIsValid(userExist.email);
        const token = await authService.googleToken(user);       
        
        //Retorna el token
        return res.json({token:token});
     }   

     //return next();

} 
catch(err){
    return console.log(err,false,err.message);
    }
}

//CONTROLADOR PARA FACEBOOK


exports.verifyUser= async (req,res)=>{
    
    const {code,birth,phone,address}=req.body;

    try{
        
        await userService.updateUserByNumber(code)
        await User.update({
            birth:birth,
            phone:phone,
            address:address
        },
        {where:{noConfirmation:code}}
        )
            

        res.json({
            code:201,
            msg:"Actualizado y validado"
        })

    }catch(err){
        res.json({
            code:501,
            error: err,
        })
    }

}