const bcrypt = require("bcrypt");
const { secret, expires, rounds } = require("../../config/auth");
const { random, customError } = require("../helpers");
const randomstring = require("randomstring");
const jwt = require("jsonwebtoken");

exports.hashPassword = (password) => {
  const hashPassword = bcrypt.hashSync(password, +rounds);
  return hashPassword;
};

exports.randomNumber = () => {
  const randomNumber = random();
  return randomNumber;
};

exports.verifyPasswordLength = (_password) => {
  const password = _password;
  if (password.length <= 6) {
    throw customError(500, "La contraseña es muy corta.");
  }
  return password;
};

exports.createToken = (externalPassword, _userDB) => {
  const userDB = _userDB;
  const id = userDB.id;
  const userPassword = userDB.password;

  if (!bcrypt.compareSync(externalPassword, userPassword)) {
    throw customError(500, "La conseña es incorrecta.");
  }

  const token = jwt.sign(//Generacion de token
    {
      user: {
        id: id,
        password: userDB.password,
        email: userDB.email,
        role: userDB.role_id,
      },
    },
    secret,
    {
      expiresIn: expires,
    }
  );
  return token;
};

exports.comparePasswords = (password, externalPassword) => {
  if (bcrypt.compareSync(password, externalPassword)) {
    throw customError(404, "La conseña no coincide.");
  }
  return true;
};

exports.generateNewPassword = () => {
  const newPassword = randomstring.generate({
    length: 7,
  });
  return newPassword;
};
