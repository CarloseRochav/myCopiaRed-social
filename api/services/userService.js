const { User } = require("../models");
const { customError } = require("../helpers");

exports.createUser = async (body, _hashPassword, _randomNumber) => {
  const newUser = {
    name: body.name,
    password: _hashPassword,
    picture: body.picture,
    birth: body.birth,
    email: body.email,
    phone: body.phone,
    address: body.address,
    role_id: body.role ? body.role : 4,
    noConfirmation: _randomNumber,
  };
  await User.create(newUser);
  return newUser;
};

exports.getUsers = async () => {
  const users = await User.findAll();
  if (!users || !users.length) {
    throw customError(404, "No hay usuarios en la base de datos.");
  }
  return users;
};

exports.getUserById = async (userId) => {
  const user = await this.userExist(userId);
  return user;
};

exports.updateUserByJWT = async (userId, body) => {
  const user = await this.userExist(userId);
  const newUser = await user.update(body);
  return newUser;
};

exports.deleteUser = async (userId) => {
  const destroy = await User.destroy({ where: { id: userId } });
  return destroy;
};

exports.userExist = async (_userId) => {
  const userId = parseInt(_userId);
  const user = await User.findOne({ where: { id: userId ? userId : -10 } });
  if (!user) {
    throw customError(404, "El usuario no existe.");
  }
  return user;
};

exports.userExistWithEmailPassword = async (_email, _password) => {
  const user = await User.findOne({
    where: { email: _email, password: _password },
  });
  if (!user) {
    throw customError(404, "El usuario no existe.");
  }
  return user;
};

exports.userExistWithEmail = async (_email) => {
  const user = await User.findOne({
    where: { email: _email },
  });
  if (!user) {
    throw customError(404, "El usuario no existe.");
  }
  return user;
};

exports.userIsValid = async (email) => {
  const user = await User.findOne({
    where: { email: email, isActivate: true },
  });
  if (!user) {
    throw customError(404, "El usuario no existe o no es valido.");
  }
  return user;
};

exports.updateUserPassword = async (_password, _email) => {
  await userExist.update(
    { password: _password },
    {
      where: {
        email: _email,
      },
    }
  );
};

exports.updateUserByNumber = async (_code) => {
  const actualizado = await User.update(
    { isActivate: true },
    {
      where: {
        noConfirmation: _code,
      },
    }
  );
  if (actualizado == 0) {
    throw customError(404, "El usuario no existe.");
  }
};
