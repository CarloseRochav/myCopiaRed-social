"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    static associate(models) {
      Categories.hasOne(models.Posts, {
        foreignKey: "Categories_id",
        target: "id",
      });

      Categories.hasOne(models.PostCategory, {
        foreignKey: "idCategories",
        target: "id",
      });
    }
  }
  Categories.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Categories",
    }
  );
  return Categories;
};
