"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PostCategory extends Model {
    static associate(models) {
      PostCategory.belongsTo(models.Posts, {
        foreignKey: "idPosts",
        target: "id",
      });

      PostCategory.belongsTo(models.Categories, {
        foreignKey: "idCategories",
        target: "id",
      });
    }
  }
  PostCategory.init(
    {
      idPosts: DataTypes.INTEGER,
      idCategories: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "PostCategory",
    }
  );
  return PostCategory;
};
