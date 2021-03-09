<<<<<<< HEAD
const { User } = require("../models/");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send("An error has occurred with the server.");
  }
};

exports.getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findOne({ where: { id: userId } });
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send("An error has occurred with the server.");
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const newUser = req.body;
  console.log(newUser);
  try {
    const user = await User.findOne({ where: { id: userId } });
    try {
      await user.update(newUser);
      res.status(200).send("User data has been updated.");
    } catch (error) {
      res.status(500).send("An error has occurred with the server.");
    }
  } catch (error) {
    res
      .status(500)
      .send("An error has occurred with the server. Usuario no encontrado");
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    await User.destroy({ where: { id: userId } });
    res.status(200).send("User has been deleted.");
  } catch (error) {
    res.status(500).send("An error has occurred with the server.");
  }
};
=======
const { User } = require("../models/");
const { formatError, formatMessage } = require("../helpers");

exports.getUsers = async (req, res) => {
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
>>>>>>> master
