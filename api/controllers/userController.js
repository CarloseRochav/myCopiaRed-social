const { User, Blacklist, sequelize } = require("../models/");
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
    return res.status(404).json({ msg: "El usuario no existe" });
  }
  imageService.updateImageProfile(fileType, buffer, id, res);
};

// metodo para bloquear a un user
// pór mientras voy a usar el async = blacklist
exports.Blacklist = async (req, res) => {
  const { user } = req.user;
  const { id } = user;
  const  idUserBloked  = req.params.idBlocked;
  try{
    
    const Userfind = await User.findByPk(idUserBloked);
    console.log(Userfind);

  if(!Userfind) {
    throw res.status(400).send("El usuario que deseas bloquear no existe.");
  };

  if( id === parseInt(idUserBloked)){
    throw res.status(400).send("No puedes bloquearte a ti mismo.");
  }
  console.log("L87");
  /*
  const userBlock = await Blacklist.findOne({
    where :{
    // User_id: req.user.id,
     UserBlocked_id: idBlocked
    },
  });

  console.log("userBlock", userBlock);

 
  console.log(userBlock);
*/
await Blacklist.create({
  User_id: id,
  UserBlocked_id: idUserBloked,
});

if(idUserBloked){
  throw res.status(400).send("Este usuario ya esta bloqueado.");
}

res.status(200).send("El usuario ha sido Bloqueado.");
console.log("entra L111");

 }catch (error) {
   console.log("error", error);
  res.status(500).send(error);  
} 
};