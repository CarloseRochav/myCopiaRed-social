"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reactions extends Model {
    static associate(models) {
      Reactions.belongsTo(models.Users, {
        foreignKey: "Users_id",
        target: "id",
      });

      Reactions.belongsTo(models.Posts, {
        foreignKey: "Posts_id",
        target: "id",
      });
    }
  }
  Reactions.init(
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
      modelName: "Reactions",
    }
  );
  return Reactions;
};
