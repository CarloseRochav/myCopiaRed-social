//Definicion de modelo Publicaciones.
"use strict";

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },

      description: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
      },
      thumbnail: {
        type: DataTypes.STRING,
      },
      video: {
        type: DataTypes.STRING,
      },
      reactions: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
      },
      video: {
        type: DataTypes.STRING,
      },
      latitude: {
        type: DataTypes.STRING,
      },
      longitude: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "Post",
    }
  );
  Post.associate = function (models) {
    Post.hasMany(models.Comments, {
      foreignKey: "Post_id",
    });
    Post.hasMany(models.Reaccions, {
      foreignKey: "Post_id",
    });
  };

  return Post;
};
