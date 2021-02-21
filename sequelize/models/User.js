//Definicion de modelo Usuario
"use strict";
const { Model, DataTypes } = require("sequelize"); //Llamando a sequelize
const sequelize = require("./index");

class User extends Model {}
User.init(
  {
    name: DataTypes.STRING,
    picture: DataTypes.STRING,
    birth: DataTypes.DATE,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    adress: DataTypes.STRING,
    roll: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "User",
  }
);

module.exports = User;
