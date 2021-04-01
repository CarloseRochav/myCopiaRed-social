const { User,Gallery } = require("../models/");
const { imageService } = require("../services");
const { formatError, formatMessage } = require("../helpers");


exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    const messageResponse = formatMessage(200, users);
    res.status(200).send(messageResponse);
  } catch (error) {
    const messageResponse = formatError(error, 500, null);
    res.status(500).send(messageResponse);
  }
};

exports.getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findOne({ where: { id: userId } });
    const messageResponse = formatMessage(200, user);
    res.status(200).send(messageResponse);
  } catch (error) {
    const messageResponse = formatError(error, 500, null);
    res.status(500).send(messageResponse);
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const newUser = req.body;
  try {
    const user = await User.findOne({ where: { id: userId } });
    await user.update(newUser);
    const messageResponse = formatMessage(200, user);
    res.status(200).send(messageResponse);
  } catch (error) {
    const messageResponse = formatError(null, 500, "User does not exist");
    res.status(500).send(messageResponse);
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    await User.destroy({ where: { id: userId } });
    const messageResponse = formatMessage(200, "User has been deleted");
    res.status(200).send(messageResponse);
  } catch (error) {
    const messageResponse = formatError(error, 500, null);
    res.status(500).send(messageResponse);
  }
};

exports.updateImageProfileUser = async (req, res) => {
  const { user } = req.user;
  const { id } = user;

  const myFile = req.file.originalname.split(".");
  const fileType = myFile[myFile.length - 1];
  const buffer = req.file.buffer;

  const userExist = await User.findByPk(id);

  if (!userExist) {
    return res.status(404).json({ code: 404, message: "El usuario no existe" });
  }
  imageService.updateImageProfile(fileType, buffer, id, res);
};

exports.updateImageBackgroundProfileUser = async (req, res) => {
  const { user } = req.user;
  const { id } = user;

  const myFile = req.file.originalname.split(".");
  const fileType = myFile[myFile.length - 1];
  const buffer = req.file.buffer;

  const userExist = await User.findByPk(id);

  if (!userExist) {
    return res.status(404).json({ code: 404, message: "El usuario no existe" });
  }
  imageService.updateImageBackgroundProfile(fileType, buffer, id, res);
};

exports.updateUserByJWT = async (req, res) => {
  const { user } = req.user;
  const { id } = user;
  const newUser = req.body;
  try {
    const user = await User.findOne({ where: { id: id } });
    await user.update(newUser);
    const messageResponse = formatMessage(200, "Usuario actualizado");
    res.status(200).send(messageResponse);
  } catch (error) {
    const messageResponse = formatError(null, 500, "User does not exist");
    res.status(500).send(messageResponse);
  }
};

exports.getUserByJWT = async (req, res) => {
  const { user } = req.user;
  const { id } = user;
  try {
    const user = await User.findOne({ where: { id: id } });
    const messageResponse = formatMessage(200, user);
    res.status(200).send(messageResponse);
  } catch (error) {
    const messageResponse = formatError(null, 500, "User does not exist");
    res.status(500).send(messageResponse);
  }
};

//CRUD S3 GALLERY

exports.getAnObject=async (req,res)=>{
    const{user}=req.user;
    const {id}=user;
    //1ra
    let key = req.body.key;
    console.log(`Tipo de dato : ${Object.keys(req.body)}`); 

    const userExist=await User.findByPk(id);
    if (!userExist)
      throw res.status(404).json({ code: 404, message: "El usuario no existe" });

    
    // try{
    //   const object = await Gallery.findOne({where:{keyResource:key}});

    //   if(!object) throw res.status(404).json({code:404, message:"Archivo no existe"});
    //   res.status(200).json({Ruta:object.pathResource,
    //                         Nombre:object.keyResource,
    //                         ByUser:object.User_id});

                             imageService.getObject(key);

    // }
    // catch(err){
    //   const message = formatError(err,404,"Error al ingresar datos");
    //   res.status(404).json(message);
    // }

  

    
   
}

exports.getAllObjects=async (req,res)=>{//Obetener todos los objetos
    const{user}=req.user;
    const {id}=user;
    

    //const key = req.body.key;

    const userExist=await User.findByPk(id);
    if (!userExist)
      throw res.status(404).json({ code: 404, message: "El usuario no existe" });    

      const objects = await Gallery.findAll();

         if(!objects) throw res.status(404).json({code:404, message:"Archivo no existe"});        
         res.status(200).json(objects);

        imageService.getAllObjects();
}


exports.deleteObject=async (req,res)=>{
    let key = req.body.key;
    const{user}=req.user;
    const {id}=user;
    const userExist=await User.findByPk(id);
    
    if (!userExist)
      throw res.status(404).json({ code: 404, message: "El usuario no existe" });
    
      
    try{
      //Eliminar registro de la base de datos que cumpla con las siguientes condiciones
      await Gallery.destroy(
        {where: {User_id:id,keyResource:key}}         
      )

      imageService.deleteImageOrVideo(key);
      
      //imageService.deleteImageOrVideo(key)
      res.status(200).json({message: "Eliminacion de objeto"});
    }
    catch (err){
      const message=formatError(err,400,"Error No coincide con la condicion");
      console.log(message);
      
    }
    

    



  
}