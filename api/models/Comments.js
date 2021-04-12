"use strict";

module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define(
    "Comments",
    {
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
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
      Post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Post",
          key: "id",
        },
        field: "Post_id",
      },
    },
    {
      tableName: "Comments",
    }
  );

  Comments.associate = function (models) {
    Comments.hasOne(models.User, { foreignKey: "id", sourceKey: "User_id" });
    Comments.hasOne(models.Post, {
      foreignKey: "id",
      sourceKey: "Post_id",
      constraints: false,
    });
  };

  return Comments;
};
