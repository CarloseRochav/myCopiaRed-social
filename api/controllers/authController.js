const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secret, expires, rounds } = require("../../config/auth");
const { User } = require("../models/");
const { formatError } = require("../helpers");

exports.signUp = async (req, res) => {
  const hashPassword = bcrypt.hashSync(req.body.password, +rounds);

  try {
    await User.create({
      name: req.body.name,
      password: hashPassword,
      picture: req.body.picture,
      birth: req.body.birth,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      role_id: req.body.role,
    });

    res.status(201).send("The new user has been created.");
  } catch (error) {
    //const messageResponse = formatError(error, 500);
    res.status(500).send(error);
  }
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  //Find user
  User.findOne({ where: { email: email } }).then((user) => {
    if (!user) {
      res.status(404).json({ msg: "User with this email was not found" });
    } else {
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
          user: { email, password },
          token: token,
        });
      } else {
        res.status(404).json({ msg: "User password is incorrect" });
      }
    }
  });
};
