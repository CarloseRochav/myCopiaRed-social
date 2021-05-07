"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Followers extends Model {
    static associate(models) {
      Followers.belongsTo(models.Users, {
        foreignKey: "Users_id",
        target: "id",
      });
      Followers.belongsTo(models.Users, {
        foreignKey: "UserFollowed_id",
        target: "id",
      });
    }
  }
  Followers.init(
    {
      Users_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      UserFollowed_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Followers",
    }
  );
  return Followers;
};
