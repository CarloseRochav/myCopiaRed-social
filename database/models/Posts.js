"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    static associate(models) {
      Posts.hasOne(models.Reactions, {
        foreignKey: "Posts_id",
        target: "id",
      });

      Posts.hasOne(models.Comments, {
        foreignKey: "Posts_id",
        target: "id",
      });

      Posts.hasOne(models.UsersViews, {
        foreignKey: "Posts_id",
        target: "id",
      });

      Posts.belongsTo(models.Users, {
        foreignKey: "Users_id",
        target: "id",
      });

      Posts.belongsTo(models.Categories, {
        foreignKey: "Categories_id",
        target: "id",
      });

      Posts.hasOne(models.PostCategory, {
        foreignKey: "postCategories_id",
        target: "id",
      });
    }
  }
  Posts.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      thumbnail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      video: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      latitude: {
        type: DataTypes.STRING,
      },
      longitude: {
        type: DataTypes.STRING,
      },
      commentsCount: {
        type: DataTypes.INTEGER,
      },
      reactionsCount: {
        type: DataTypes.INTEGER,
      },
      Users_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Categories_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Posts",
    }
  );
  return Posts;
};
