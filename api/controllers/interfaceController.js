const { Users, Interfaces } = require("../../database/models");
const { s3Service } = require("../services");

exports.getInterface = async (req, res) => {
  try {
    const interfaces = await Interfaces.findAll();
    return res.status(200).json({ code: 200, msg: interfaces });
  } catch (error) {
    return res
      .status(error.code ? error.code : 500)
      .json(
        error.message ? { code: 500, msg: error.errors[0].message } : error
      );
  }
};

exports.createInterface = async (req, res) => {
  const { user } = req.user;
  const { id } = user;
  const newInterface = req.body;
  try {
    const userExist = await Users.findByPk(id);
    if (!userExist) {
      return res
        .status(404)
        .json({ code: 404, message: "El usuario no existe" });
    }

    await Interfaces.create({
      Logo: newInterface.logo,
      PrimaryColor: newInterface.primaryColor,
      SecondaryColor: newInterface.secondaryColor,
    });

    return res
      .status(200)
      .json({ code: 200, msg: "La interfaz ha sido actualizada exitosamente" });
  } catch (error) {
    return res
      .status(error.code ? error.code : 500)
      .json(error.message ? { code: 500, msg: error.message } : error);
  }
};

exports.updateInterface = async (req, res) => {
  const { user } = req.user;
  const { id } = user;
  const newInterface = req.body;

  const myFile = req.file.originalname.split(".");
  const fileType = myFile[myFile.length - 1];
  const buffer = req.file.buffer;

  try {
    const userExist = await Users.findByPk(id);
    if (!userExist) {
      return res
        .status(404)
        .json({ code: 404, message: "El usuario no existe" });
    }
    await s3Service.uploadLogo(newInterface, fileType, buffer);
    res
      .status(200)
      .json({ code: 200, message: "La configuracion ha sido actualizada" });
  } catch (error) {
    return res
      .status(error.code ? error.code : 500)
      .json(error.message ? { code: 500, msg: error.message } : error);
  }
};
