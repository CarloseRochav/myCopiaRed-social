"use strict";
module.exports = (sequelize, DataTypes) => {
  const Interface = sequelize.define(
    "Interface",
    {
      Logo: {
        type: DataTypes.STRING,
      },
      PrimaryColor: {
        type: DataTypes.STRING,
      },
      SecondaryColor: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "Interfaces",
    }
  );
  return Interface;

  // const roles = async () => {
  //   Role.create({ name: "Administrador", description: "Admin" });
  //   Role.create({ name: "Auxiliar", description: "Usuario Auxiliar" });
  //   Role.create({ name: "VIP", description: "Usuario VIP" });
  //   Role.create({ name: "Normal", description: "Usuario comun" });
  // };

  // roles();
};
