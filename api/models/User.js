//Definicion de modelo Usuario

"use strict";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: {
        //Name
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        validate: {
          isAlpha: {
            msg: "El nombre solo puede contener letras",
          },
          len: {
            args: [2, 255],
            msg: "El nombre tiene que ser minimamente de dos caracters",
          },
        },
      },
      password: {
        //Password
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [6, 255],
            msg: "La contraseña tiene que tener minimamente 6 caracteres",
          },
        },
      },
      picture: {
        type: DataTypes.STRING,
      },
      //Picture
      birth: {
        type: DataTypes.DATE,
        allowNull: true,
        unique: false,
      },
      email: {
        //Email
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "El email tiene que ser un correo valido",
          },
        },
      },
      phone: {
        //Phone
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: false,
      },
      address: {
        //Direccion
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
      },
    },

    {
      tableName: "Users",
    }
  );

  return User;
};
