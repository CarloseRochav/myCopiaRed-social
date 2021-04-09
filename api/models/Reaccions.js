"use strict";

module.exports = (sequelize, DataTypes) => {
  const Reaccions = sequelize.define(
    "Reaccions",
    {},
    {
      tableName: "Reaccions",
    }
  );
  return Reaccions;
};
