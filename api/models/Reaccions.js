"use strict";

module.exports = (sequelize, DataTypes) => {
  const Reaccions = sequelize.define(
    "Reaccions",
    {
      Post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Post",
          key: "id",
        },
        field: "Post_id",
      },
      User_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
        field: "User_id",
      },
    },
    {
      tableName: "Reaccions",
    }
  );

  Reaccions.associate = function (models) {
    Reaccions.hasOne(models.User, { foreignKey: "id", sourceKey: "User_id" });
    Reaccions.hasOne(models.Post, {
      foreignKey: "id",
      sourceKey: "Post_id",
      constraints: false,
    });
  };

  return Reaccions;
};
