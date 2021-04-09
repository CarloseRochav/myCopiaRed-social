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
    },
    {
      tableName: "Comments",
    }
  );

  return Comments;
};
