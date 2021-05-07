const { User,Gallery } = require("../../database/models");
const { imageService } = require("../services");
const { formatError, formatMessage } = require("../helpers");


const { s3Service, userService, blacklistService } = require("../services");

//#region Basic User Methods
exports.getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    return res.status(200).json({ code: 200, msg: users });
  } catch (error) {
    return res
      .status(error.code ? error.code : 500)
      .json(error.message ? { code: 500, msg: error.message } : error);
  }
};

exports.getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await userService.getUserById(userId);
    return res.status(200).json({ code: 200, msg: user });
  } catch (error) {
    return res
      .status(error.code ? error.code : 500)
      .json(error.message ? { code: 500, msg: error.message } : error);
  }
};

exports.getUserByJWT = async (req, res) => {
  const { user } = req.user;
  const { id } = user;
  try {
    const user = await userService.getUserById(id);
    return res.status(200).json({ code: 200, msg: user });
  } catch (error) {
    return res
      .status(error.code ? error.code : 500)
      .json(error.message ? { code: 500, msg: error.message } : error);
  }
};

exports.updateUserByJWT = async (req, res) => {
  const { user } = req.user;
  const { id } = user;
  const body = req.body;
  try {
    const user = await userService.updateUserByJWT(id, body);
    return res
      .status(200)
      .json({ code: 200, msg: "El usuario ha sido actualizado", extra: user });
  } catch (error) {
    return res
      .status(error.code ? error.code : 500)
      .json(error.message ? { code: 500, msg: error.message } : error);
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    await userService.userExist(userId);
    await userService.deleteUser(userId);
    return res
      .status(200)
      .json({ code: 200, msg: "El usuario ha sido eliminado" });
  } catch (error) {
    return res
      .status(error.code ? error.code : 500)
      .json(error.message ? { code: 500, msg: error.message } : error);
  }
};
//#endregion
//#region Profile images User Methods
exports.updateImageProfileUser = async (req, res) => {
  const { user } = req.user;
  const { id } = user;

  const myFile = req.file.originalname.split(".");
  const fileType = myFile[myFile.length - 1];
  const buffer = req.file.buffer;

  try {
    await userService.userExist(id);
    await s3Service.updateImageProfile(fileType, buffer, id);
    return res.status(200).json({ code: 200, msg: "Imagen Subida con exito" });
  } catch (error) {
    return res
      .status(error.code ? error.code : 500)
      .json(error.message ? { code: 500, msg: error.message } : error);
  }
};

exports.updateImageBackgroundProfileUser = async (req, res) => {
  const { user } = req.user;
  const { id } = user;

  const myFile = req.file.originalname.split(".");
  const fileType = myFile[myFile.length - 1];
  const buffer = req.file.buffer;

  try {
    await userService.userExist(id);
    await s3Service.updateImageBackgroundProfile(fileType, buffer, id);
    return res.status(200).json({ code: 200, msg: "Imagen Subida con exito" });
  } catch (error) {
    return res
      .status(error.code ? error.code : 500)
      .json(error.message ? { code: 500, msg: error.message } : error);
  }
};
//#endregion
//#region Blacklist User Methods
exports.Blacklist = async (req, res) => {
  const { user } = req.user;
  const { id: blockerId } = user;
  const blockedId = req.params.id;
  try {
    await blacklistService.compareTwoIds(blockerId, blockedId);
    await userService.userExist(blockerId);
    await userService.userExist(blockedId);
    await blacklistService.findBlockUser(blockerId, blockedId);
    await blacklistService.findBlockUser(blockedId, blockerId);
    await blacklistService.addToBlacklist(blockerId, blockedId);

    return res
      .status(200)
      .json({ code: 200, msg: "El Usuario ha sido bloqueado" });
  } catch (error) {
    return res
      .status(error.code ? error.code : 500)
      .json(error.message ? { code: 500, msg: error.message } : error);
  }
}

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

    
    try{
      const object = await Gallery.findOne({where:{keyResource:key}});

      if(!object) throw res.status(404).json({code:404, message:"Archivo no existe"});
      res.status(200).json({Ruta:object.pathResource,
                            Nombre:object.keyResource,
                            ByUser:object.User_id});

                             imageService.getObject(key);

    }
    catch(err){
      const message = formatError(err,404,"Error al ingresar datos");
      res.status(404).json(message);
    }

  

    
   
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
//#endregion

exports.getAUserByJWT = async (req, res) => {
  const { user } = req.user;
  const { id } = user;
  const idUserCasa = req.params.id;
  try {
    const user = await userService.userData(id, idUserCasa);
    return res.status(200).json({ code: 200, msg: user });
  } catch (error) {
    return res
      .status(error.code ? error.code : 500)
      .json(error.message ? { code: 500, msg: error.message } : error);
  }
};
