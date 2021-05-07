"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BlackLists extends Model {
    static associate(models) {
      BlackLists.belongsTo(models.Users, {
        foreignKey: "Users_id",
        target: "id",
      });
      BlackLists.belongsTo(models.Users, {
        foreignKey: "UserBlocked_id",
        target: "id",
      });
    }
  }
  BlackLists.init(
    {
      Users_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      UserBlocked_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "BlackLists",
    }
  );
  return BlackLists;
};
