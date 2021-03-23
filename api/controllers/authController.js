const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secret, expires, rounds } = require("../../config/auth");
const { User } = require("../models/");
const { formatError, formatMessage, random } = require("../helpers");
const { mailerService } = require("../services/");

exports.signUp = async (req, res) => {
  const hashPassword = bcrypt.hashSync(req.body.password, +rounds);
  const randomNumber = random();
  try {
    await User.create({
      name: req.body.name,
      password: hashPassword,
      picture: req.body.picture,
      birth: req.body.birth,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      role_id: req.body.role ? req.body.role : 4,
      noConfirmation: randomNumber,
    });
    mailerService.sendConfirmEmail(res, req.body.email, randomNumber);
    const messageResponse = formatMessage(
      201,
      "The new user has been created."
    );
    res.status(201).send(messageResponse);
  } catch (error) {
    // const messageResponse = formatError(
    //   null,
    //   500,
    //   "Hay un error con los datos"
    // );
    const messageResponse = formatError(
      error,
      500,
      //"Hay un error con los datos"
    );
    //res.status(500).send(error);
    res.status(500).send(messageResponse);
  }
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      where: { email: email, isActivate: true },
    });
    if (!user) {
      const messageResponse = formatError(
        null,
        404,
        "User with this email was not found or is not valid"
      );
      throw res.status(404).json(messageResponse);
    }
    if (bcrypt.compareSync(password, user.password)) {
      const id = user.id;
      const userPassword = user.password;
      const token = jwt.sign(
        { user: { id, password: userPassword, email } },
        secret,
        {
          expiresIn: expires,
        }
      );
      res.json({
        code: 201,
        user: { id, email },
        token: token,
      });
    } else {
      const messageResponse = formatError(
        null,
        500,
        "User password is incorrect"
      );
      res.status(404).json(messageResponse);
    }
  } catch (error) {
    const messageResponse = formatError(error, 404, "Ha ocurrido un error");
    res.status(404).json(messageResponse);
  }
};

exports.changePassword = async (req, res) => {
  const { user } = req.user;
  const { id, email, password } = user;
  const userExist = await User.findOne({
    where: { id: id, email: email, password: password },
  });
  const newPassword = req.body.password;
  try {
    if (!userExist) {
      throw res.status(404).send("Usuario no existe");
    }
    if (!bcrypt.compareSync(newPassword, password)) {
      throw res.status(404).send("La Contrasena no coincide");
    }
    const newHashPassword = bcrypt.hashSync(newPassword, +rounds);
    const newUser = userExist;
    newUser.password = newHashPassword;
    await userExist.update(newUser);
    mailerService.sendChangePassword(res, emailUser, newPassword);
    res.status(200).send("Contrasena actualizada");
  } catch (error) {
    res.status(400).send("Hubo un error al actualizar la Contrasena");
  }
};

exports.sendRecoveryPassword = async (req, res) => {
  const emailUser = req.body.email;
  const userExist = await User.findOne({
    where: { email: emailUser },
  });
  try {
    if (!userExist) {
      throw res.status(404).send("Usuario no existe");
    }
    const newUser = userExist;
    newUser.password = `NERTSDF63248`;
    await userExist.update(newUser);
    mailerService.sendChangePassword(res, emailUser, newUser.password);
    res.status(200).send("Contrasena actualizada");
  } catch (error) {
    res.status(400).send("Hubo un error");
  }
};

exports.verifyUser = async (req, res) => {
  const _code = req.params.code;
  try {
    const actualizado = await User.update(
      { isActivate: true },
      {
        where: {
          noConfirmation: _code,
        },
      }
    );
    if (actualizado == 0) {
      throw res.status(404).json({ code: 404, msg: "Usuario no encontrado" });
    }
    res.status(201).json({ code: 201, msg: "Usuario validado" });
  } catch (error) {}
};
