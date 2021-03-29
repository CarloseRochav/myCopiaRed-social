const { formatError, formatMessage } = require("../helpers");
const { User, Interface } = require("../models");

exports.getInterface = async (req, res) => {
  try {
    const interface = await Interface.findAll();
    const messageResponse = formatMessage(200, interface);
    res.status(200).send(messageResponse);
  } catch (error) {
    const messageResponse = formatError(error, 500, null);
    res.status(500).send(messageResponse);
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

    res
      .status(200)
      .json({ code: 200, message: "La interfaz ha sido creada exitosamente" });
  } catch (error) {
    res.status(500).json({ code: 500, message: error });
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
