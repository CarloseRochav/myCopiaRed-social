const {User} = require("../models/");
const { formatError, formatMessage } = require("../helpers");

exports.getUsers = async (req, res) => { //Exportacion de metodo getUser ; para su uso a partir del archivo
  try {
    const users = await User.findAll();
    const messageResponse = formatMessage(200, users);
    res.status(200).send(messageResponse);
  } catch (error) {
    const messageResponse = formatError(error, 500, null);
    res.status(500).send(messageResponse);
  }
};

exports.getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findOne({ where: { id: userId } });
    const messageResponse = formatMessage(200, user);
    res.status(200).send(messageResponse);
  } catch (error) {
    const messageResponse = formatError(error, 500, null);
    res.status(500).send(messageResponse);
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const newUser = req.body;
  try {
    const user = await User.findOne({ where: { id: userId } });
    await user.update(newUser);
    const messageResponse = formatMessage(200, user);
    res.status(200).send(messageResponse);
  } catch (error) {
    const messageResponse = formatError(null, 500, "User does not exist");
    res.status(500).send(messageResponse);
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    await User.destroy({ where: { id: userId } });
    const messageResponse = formatMessage(200, "User has been deleted");
    res.status(200).send(messageResponse);
  } catch (error) {
    const messageResponse = formatError(error, 500, null);
    res.status(500).send(messageResponse);
  }
};
