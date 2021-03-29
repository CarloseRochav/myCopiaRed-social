"use strict";
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "categories",
    }
  );
  return Category;
};
