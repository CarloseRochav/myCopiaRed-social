"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Interfaces extends Model {
    static associate(models) {}
  }
  Interfaces.init(
    {
      logo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      primaryColor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      secondaryColor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Interfaces",
    }
  );
  return Interfaces;
};
