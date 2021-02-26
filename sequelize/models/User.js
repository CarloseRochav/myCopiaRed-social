//Definicion de modelo Usuario
"use strict";
const { Model, DataTypes } = require("sequelize"); //Llamando a sequelize
const sequelize = require("./");

class User extends Model {}
User.init(
  {
    name: {
      //Name
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    password: {
      //Password
      type: DataTypes.STRING,
      allowNull: false,
    },
    picture: {
      type: DataTypes.STRING,
    },
    //Picture
    birth: {
      type: DataTypes.DATE,
      allowNull: true,
      unique: false,
    },
    email: {
      //Email
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      //Phone
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
    },
    address: {
      //Direccion
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
    },
    roll: {
      //Puesto/rol
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

module.exports = User;
