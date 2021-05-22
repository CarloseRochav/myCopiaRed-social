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
      // define association here

      // PostCategory.hasOne(models.Posts, {
      //   foreignKey: "Users_id",
      //   target: "id",
      // });

      PostCategory.belongsTo(models.Posts, {
        foreignKey: "Post_id",
        target: "id",
      });

      //Pendiente
      PostCategory.belongsTo(models.Categories, {
        foreignKey: "Category_id",
        target: "id",
      });
    }
  };
  PostCategory.init({
    idPost: DataTypes.INTEGER,
    idCategory: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PostCategory',
  });
  return PostCategory;
};