'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      

      PostCategory.belongsTo(models.Posts, {
        foreignKey: "id",
        target: "id",
      });

      //Pendiente
      PostCategory.belongsTo(models.Categories, {
        foreignKey: "id",
        target: "id",
      });
    }
  };
  PostCategory.init({
    idPosts: DataTypes.INTEGER,
    idCategories: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PostCategory',
  });
  return PostCategory;
};