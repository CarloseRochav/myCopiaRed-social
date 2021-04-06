const { User, Interface } = require("../models");

exports.getInterface = async (req, res) => {
  try {
    const interfaces = await Interface.findAll();
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
    const userExist = await User.findByPk(id);
    if (!userExist) {
      throw res
        .status(404)
        .json({ code: 404, message: "El usuario no existe" });
    }

    await Interface.create({
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
      .json(
        error.message ? { code: 500, msg: error.errors[0].message } : error
      );
  }
};

exports.updateInterface = async (req, res) => {
  const { user } = req.user;
  const { id } = user;
  const newInterface = req.body;
  try {
    const userExist = await User.findByPk(id);
    if (!userExist) {
      throw res
        .status(404)
        .json({ code: 404, message: "El usuario no existe" });
    }
    await Interface.update(
      {
        Logo: newInterface.logo,
        PrimaryColor: newInterface.primaryColor,
        SecondaryColor: newInterface.secondaryColor,
      },
      {
        where: {
          id: 1,
        },
      }
    );
    res
      .status(200)
      .json({ code: 200, message: "La configuracion ha sido actualizada" });
  } catch (error) {
    res.status(500).json({ code: 500, message: error });
  }
};
