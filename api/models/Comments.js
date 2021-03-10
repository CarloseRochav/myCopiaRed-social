"use strict";
module.exports = (sequelize, DataTypes) => {
  let Comments = sequelize.define(
    "Comments",
    {
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: "Comments",
    }
  );

  
  return Comments;
};