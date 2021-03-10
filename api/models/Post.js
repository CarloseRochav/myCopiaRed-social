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
      type: DataTypes.DATE,
      allowNull: true,
      unique: false,
    },
    
    video: {
      //video
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
    },
    reactions: {
      //reacciones
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
    },
    
   },
  {
    tableName: "Post",
  }
  
);

Post.associate = function (models) {
  Post.hasMany(models.Comments, {
      foreignKey: "post_id",
    });
  };
return Post;
};

