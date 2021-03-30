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
          notNull: {
            msg: "La contraseña no tiene que ser null",
          },
          len: {
            args: [6, 255],
            msg: "La contraseña tiene que tener minimamente 6 caracteres",
          },
        },
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      backgroundpicture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
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
        unique: {
          args: true,
          msg: "Este correo ya existe", //Mensaje indicacion que este correo no esta disponible
        },
        validate: {
          isEmail: {
            msg: "El email tiene que ser un correo valido.",
          },
        },
      },
      phone: {
        //Phone
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: false,
        validate: {
          isNumeric: {
            msg: "El numero telefonico tiene que ser valido.",
          },
        },
      },
      address: {
        //Direccion
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
      },
      isActivate: {
        //Activacion de cuenta
        type: DataTypes.BOOLEAN, //Tipo de valor bool
        allowNull: true, //Permiter valores nulos
        unique: false, //Pueden ser valores repetidos
        defaultVaulue: 0, //Estableciedo false como inicion
      },
      noConfirmation: {
        //Numero de confirmacion
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: false,
      },
      isBlocked: {
        type: DataTypes.BOOLEAN, //Tipo de valor bool
        allowNull: true, //Permiter valores nulos
        unique: false, //Pueden ser valores repetidos
        defaultVaulue: 0, //Estableciedo false como inicion
      },
      isPublic: {
        type: DataTypes.BOOLEAN, //Tipo de valor bool
        allowNull: true, //Permiter valores nulos
        unique: false, //Pueden ser valores repetidos
        defaultVaulue: 1, //Estableciedo false como inicion
      },
    },

    {
      tableName: "Users",
    }
  );

  User.associate = function (models) {
    User.hasMany(models.Post, {
        foreignKey: "User_id",
      });

    };

  //Segunda asociacion
  User.associate = function(models){
    User.hasOne(models.Gallery,{
      foreignKey:"User_id",
    });

  }

  return User;  
  
};