"use strict"
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

  // const roles = async () => {
  //   Role.create({ name: "Administrador", description: "Admin" });
  //   Role.create({ name: "Auxiliar", description: "Usuario Auxiliar" });
  //   Role.create({ name: "VIP", description: "Usuario VIP" });
  //   Role.create({ name: "Normal", description: "Usuario comun" });
  // };

  // roles();

  Role.associate = function (models) {
    Role.hasMany(models.User, {
      foreignKey: "role_id",
    });
  };
  return Role;
};
