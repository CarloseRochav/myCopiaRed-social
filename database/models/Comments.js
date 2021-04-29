"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    static associate(models) {
      Comments.belongsTo(models.Users, {
        foreignKey: "Users_id",
        target: "id",
      });

      Comments.belongsTo(models.Posts, {
        foreignKey: "Posts_id",
        target: "id",
      });
    }
  }
  Comments.init(
    {
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Users_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Posts_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Comments",
    }
  );
  return Comments;
};
