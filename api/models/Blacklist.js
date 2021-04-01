"use strict";

module.exports = (sequelize, DataTypes) => {
  const Blacklist = sequelize.define(
    "Blacklist",
    {
      User_id: DataTypes.INTEGER,
      UserBlocked_id: DataTypes.INTEGER,
    },
    {
      tableName: "Blacklists",
    }
  );

  return Blacklist;
};
