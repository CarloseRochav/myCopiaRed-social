//Definicion de modelo Publicaciones.
"use strict";

module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define(
      "Post",
  {
    title: {
      //nombre del titulo del video
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    
    description: {
      //descripcion del video
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
    },
    
    video: {
      //video
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
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
  };

  Post.associate = function (models) {
    Post.hasMany(models.Reaccions, {
        foreignKey: "Post_id",
      });
    };
return Post;
};

