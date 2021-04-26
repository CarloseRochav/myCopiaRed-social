const { Users } = require("../../database/models");
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
    isPublic: true,
    isBlocked: false,
    Roles_id: body.Roles_id ? body.Roles_id : 4,
    noConfirmation: _randomNumber,
  };
  await Users.create(newUser);
  return newUser;
};

exports.getUsers = async () => {
  const users = await Users.findAll();
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
  const destroy = await Users.destroy({ where: { id: userId } });
  return destroy;
};

exports.userExist = async (_userId) => {
  const userId = parseInt(_userId);
  const user = await Users.findOne({ where: { id: userId ? userId : -10 } });
  if (!user) {
    throw customError(404, "El usuario no existe.");
  }
  return user;
};

exports.userExistWithEmailPassword = async (_email, _password) => {
  const user = await Users.findOne({
    where: { email: _email, password: _password },
  });
  if (!user) {
    throw customError(404, "El usuario no existe.");
  }
  return user;
};

exports.userExistWithEmail = async (_email) => {
  const userEmail = _email;
  const user = await Users.findOne({
    where: { email: userEmail },
  });
  if (!user) {
    throw customError(404, "El usuario no existe.");
  }
  return user;
};

exports.userIsValid = async (_email) => {
  const user = await Users.findOne({
    where: { email: _email, isActivate: true },
  });
  if (!user) {
    throw customError(404, "El usuario no existe o no es valido.");
  }
  return user;
};

exports.updateUserPassword = async (_password, _email) => {
  await Users.update(
    { password: _password },
    {
      where: {
        email: _email,
      },
    }
  );
};

exports.updateUserByNumber = async (_code) => {
  const actualizado = await Users.update(
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
