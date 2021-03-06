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
