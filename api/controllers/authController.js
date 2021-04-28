const { mailerService, authService, userService } = require("../services");
const { cu } = require("../helpers");

exports.signUp = async (req, res) => {
  const password = req.body.password;
  const hashPassword = authService.hashPassword(password);
  const randomNumber = authService.randomNumber();

  try {
    authService.verifyPasswordLength(password);
    await userService.createUser(req.body, hashPassword, randomNumber);
    await mailerService.sendConfirmEmail(req.body.email, randomNumber);
    return res
      .status(200)
      .json({ code: 200, msg: "Usuario creado con exito." });
  } catch (error) {
    return res
      .status(error.code ? error.code : 500)
      .json(error.message ? { code: 500, msg: error.message } : error);
  }
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.userIsValid(email);
    const token = authService.createToken(password, user);
    return res
      .status(200)
      .json({ code: 200, msg: token, rolID: user.Roles_id });
  } catch (error) {
    return res
      .status(error.code ? error.code : 500)
      .json(error.message ? { code: 500, msg: error.message } : error);
  }
};

exports.changePassword = async (req, res) => {
  const { user } = req.user;
  const { email } = user;
  const newPassword = req.body.password;
  try {
    await userService.userIsValid(email);
    const newHashPassword = authService.hashPassword(newPassword);
    await userService.updateUserPassword(newHashPassword, email);
    await mailerService.sendChangePassword(email, newPassword);

    return res.status(200).json({ code: 200, msg: "Contraseña Actualizada." });
  } catch (error) {
    return res
      .status(error.code ? error.code : 500)
      .json(error.message ? { code: 500, msg: error.message } : error);
  }
};

exports.sendRecoveryPassword = async (req, res) => {
  const emailUser = req.body.email;
  try {
    await userService.userExistWithEmail(emailUser);
    const newPassword = authService.generateNewPassword();
    const newHashPassword = authService.hashPassword(newPassword);
    await userService.updateUserPassword(newHashPassword, emailUser);
    await mailerService.sendChangePassword(emailUser, newPassword);

    return res.status(200).json({
      code: 200,
      msg: "Contraseña Actualizada, favor de revisar el correo.",
    });
  } catch (error) {
    return res
      .status(error.code ? error.code : 500)
      .json(error.message ? { code: 500, msg: error.message } : error);
  }
};

exports.verifyUser = async (req, res) => {
  const code = req.params.code;
  try {
    await userService.updateUserByNumber(code);
    return res.status(200).json({
      code: 200,
      msg: "Usuario Validado.",
    });
  } catch (error) {
    return res
      .status(error.code ? error.code : 500)
      .json(error.message ? { code: 500, msg: error.message } : error);
  }
};
