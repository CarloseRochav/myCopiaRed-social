"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ReportLists extends Model {
    static associate(models) {
      ReportLists.belongsTo(models.Users, {
        foreignKey: "Users_id",
        target: "id",
      });
      ReportLists.belongsTo(models.Posts, {
        foreignKey : "Posts_id",
        target: "id",
      });
      ReportLists.belongsTo(models.Users, {
        foreignKey: "Roles_id",
        target: "id"
      });
    }
  }
  ReportLists.init(
    {
      Users_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Posts_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Roles_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Active: {
        type: DataTypes.BOOLEAN,
      },
      
    },
    {
      sequelize,
      modelName: "ReportLists",
    }
  );
  return ReportLists;
};