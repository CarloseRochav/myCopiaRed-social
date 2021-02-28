"use strict";
module.exports = (sequelize, DataTypes) => {
  let Role = sequelize.define(
    "Role",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "Roles",
    }
  );

  Role.associate = function (models) {
    Role.hasMany(models.User, {
      foreignKey: "role_id",
    });
  };
  return Role;
};
