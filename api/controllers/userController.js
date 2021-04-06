const { s3Service, userService, blacklistService } = require("../services");

//#region Basic User Methods
exports.getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    return res.status(200).json({ code: 200, msg: users });
  } catch (error) {
    return res
      .status(error.code ? error.code : 500)
      .json(
        error.message ? { code: 500, msg: error.errors[0].message } : error
      );
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
      .json(
        error.message ? { code: 500, msg: error.errors[0].message } : error
      );
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
      .json(
        error.message ? { code: 500, msg: error.errors[0].message } : error
      );
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
      .json(
        error.message ? { code: 500, msg: error.errors[0].message } : error
      );
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
      .json(
        error.message ? { code: 500, msg: error.errors[0].message } : error
      );
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
      .json(
        error.message ? { code: 500, msg: error.errors[0].message } : error
      );
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
      .json(
        error.message ? { code: 500, msg: error.errors[0].message } : error
      );
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
      .json(
        error.message ? { code: 500, msg: error.errors[0].message } : error
      );
  }
};
//#endregion
