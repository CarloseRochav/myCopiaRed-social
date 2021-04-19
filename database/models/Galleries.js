"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Galleries extends Model {
    static associate(models) {
      Galleries.belongsTo(models.Users, {
        foreignKey: "Users_id",
        target: "id",
      });
    }
  }
  Galleries.init(
    {
      pathResource: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      keyResource: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Users_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Galleries",
    }
  );
  return Galleries;
};
