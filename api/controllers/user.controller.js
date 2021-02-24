const User = require("../../sequelize/models/User");
const { validationResult } = require("express-validator");

exports.createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    await User.create({
      name: req.body.name,
      picture: req.body.picture,
      birth: req.body.birth,
      email: req.body.email,
      phone: req.body.phone,
      adress: req.body.adress,
      roll: req.body.roll,
    });
    res.status(201).send("The new user has been created.");
  } catch (error) {
    res.status(500).send("An error has occurred with the server.");
  }
};

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
    await user.update(newUser);
    res.status(200).send("User data has been updated.");
  } catch (error) {
    res.status(500).send("An error has occurred with the server.");
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
