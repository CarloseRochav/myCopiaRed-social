"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UsersViews extends Model {
    static associate(models) {
      UsersViews.belongsTo(models.Users, {
        foreignKey: "Users_id",
        target: "id",
      });

      UsersViews.belongsTo(models.Posts, {
        foreignKey: "Posts_id",
        target: "id",
      });
    }
  }
  UsersViews.init(
    {
      Posts_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Users_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "UsersViews",
    }
  );
  return UsersViews;
};
