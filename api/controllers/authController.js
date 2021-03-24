const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secret, expires, rounds } = require("../../config/auth");
const { User } = require("../models/");
const { formatError, formatMessage, random } = require("../helpers");
const { mailerService } = require("../services/");
const randomstring = require("randomstring");

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
    const messageResponse = formatError(
      null,
      500,
      "Hay un error con los datos"
    );
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
        { user: { id, password: userPassword, email, role: user.role_id } },
        secret,
        {
          expiresIn: expires,
        }
      );
      return res.status(201).json({
        code: 201,
        message: { role: user.role_id },
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
    const messageResponse = formatError(null, 404, "Ha ocurrido un error");
    res.status(404).json(messageResponse);
  }
};

exports.changePassword = async (req, res) => {
  const { user } = req.user;
  const { id, email, password } = user;
  const newPassword = req.body.password;
  try {
    const userExist = await User.findOne({
      where: { id: id, email: email, password: password },
    });

    if (!userExist) {
      throw res
        .status(404)
        .json({ code: 404, message: "El usuario no existe" });
    }
    if (bcrypt.compareSync(password, newPassword)) {
      throw res
        .status(400)
        .json({ code: 400, message: "La Contrasena no coincide" });
    }
    const newHashPassword = bcrypt.hashSync(newPassword, +rounds);
    const actualizado = await userExist.update(
      { password: newHashPassword },
      {
        where: {
          email: email,
        },
      }
    );

    if (actualizado == 0) {
      throw res
        .status(404)
        .json({ code: 404, message: "El usuario no existe" });
    }

    mailerService.sendChangePassword(res, email, newPassword);
    res.status(200).json({ code: 200, message: "Contrasena actualizada" });
  } catch (error) {
    res.status(400).json({ code: 400, message: error });
  }
};

exports.sendRecoveryPassword = async (req, res) => {
  const emailUser = req.body.email;
  try {
    const userExist = await User.findOne({
      where: { email: emailUser },
    });
    if (!userExist) {
      throw res
        .status(404)
        .json({ code: 404, message: "El usuario no existe" });
    }
    const newPassword = randomstring.generate({
      length: 7,
    });

    const newHashPassword = bcrypt.hashSync(newPassword, +rounds);
    const actualizado = await userExist.update(
      { password: newHashPassword },
      {
        where: {
          email: emailUser,
        },
      }
    );

    if (actualizado == 0) {
      throw res
        .status(404)
        .json({ code: 404, message: "El usuario no existe" });
    }

    await mailerService.sendChangePassword(res, emailUser, newPassword);
    res.status(201).json({
      code: 201,
      message: "Contrasena actualizada favor de revisar el correo",
    });
  } catch (error) {
    res.status(400).json({ code: 400, message: error });
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
      throw res
        .status(404)
        .json({ code: 404, message: "El usuario no existe" });
    }
    res.status(201).json({ code: 201, message: "Usuario validado" });
  } catch (error) {}
};
