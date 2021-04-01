const { User, Blacklist, sequelize } = require("../models");
const { imageService } = require("../services");
const { formatError, formatMessage, validationError } = require("../helpers");

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
  const { id: blockerId } = user;
  const blockedId = req.params.id;
  try {
    if (blockerId === parseInt(blockedId)) {
      throw validationError(500, "No te puedes bloquear a ti mismo");
    }
    const blockerUserExist = await User.findByPk(blockerId);
    const blockedUserExist = await User.findByPk(blockedId);
    if (!blockerUserExist) {
      throw validationError(404, "Tu usuario no existe");
    }
    if (!blockedUserExist) {
      throw validationError(404, "El Usuario a bloquear no existe");
    }

    const userBlock = await Blacklist.findOne({
      where: {
        User_id: blockerId,
        UserBlocked_id: parseInt(blockedId),
      },
    });

    if (userBlock) {
      throw validationError(505, "El Usuario ya esta bloqueado");
    }

    await Blacklist.create({
      User_id: blockerId,
      UserBlocked_id: parseInt(blockedId),
    });

    return res
      .status(200)
      .json({ code: 200, msg: "El Usuario ha sido bloqueado" });
  } catch (error) {
    return res.status(error.code).json({ code: error.code, msg: error.msg });
  }
};
