//Definicion de modelo Publicaciones.
("use strict");

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
      commentsCount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      reactionsCount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      User_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
        field: "User_id",
      },
    },
    {
      tableName: "Post",
    }
  );

  Post.associate = function (models) {
    Post.hasOne(models.User, {
      foreignKey: "id",
      sourceKey: "User_id",
    });
    Post.hasMany(models.Comments, {
      foreignKey: "Post_id",
    });
    Post.hasMany(models.Reaccions, {
      foreignKey: "Post_id",
    });
  };

  return Post;
};
