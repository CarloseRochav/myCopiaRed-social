"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.hasOne(models.Posts, {
        foreignKey: "Users_id",
        target: "id",
      });

      Users.hasOne(models.Reactions, {
        foreignKey: "Users_id",
        target: "id",
      });

      Users.hasOne(models.Galleries, {
        foreignKey: "Users_id",
        target: "id",
      });

      Users.hasOne(models.Comments, {
        foreignKey: "Users_id",
        target: "id",
      });

      Users.hasOne(models.UsersViews, {
        foreignKey: "Users_id",
        target: "id",
      });

      Users.hasOne(models.BlackLists, {
        foreignKey: "Users_id",
        target: "id",
      });

      Users.hasOne(models.BlackLists, {
        foreignKey: "UserBlocked_id",
        target: "id",
      });

      Users.hasOne(models.Followers, {
        foreignKey: "Users_id",
        target: "id",
      });

      Users.hasOne(models.Followers, {
        foreignKey: "UserFollowed_id",
        target: "id",
      });

      Users.belongsTo(models.Roles, {
        foreignKey: "Roles_id",
        target: "id",
      });
    }
  }
  Users.init(
    {
      idGoogle: {
        type: DataTypes.STRING,
        unique: true,
      },
      idFacebook: {
        type: DataTypes.STRING,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Ese nombre ya esta en uso.",
        },
        validate: {
          isAlpha: {
            msg:
              "El nombre solo puede contener letras y no puede tener espacios en blanco.",
          },
          len: {
            args: [2, 255],
            msg: "El nombre tiene que ser minimamente de dos caracters",
          },
        },
      },
      password: {
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
      },
      backgroundpicture: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      birth: {
        type: DataTypes.DATEONLY,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Este correo ya existe",
        },
        validate: {
          isEmail: {
            msg: "El email tiene que ser un correo valido.",
          },
        },
      },
      phone: {
        type: DataTypes.BIGINT,
        validate: {
          isNumeric: {
            msg: "El numero telefonico tiene que ser valido.",
          },
        },
      },
      address: {
        type: DataTypes.STRING,
      },
      isActivate: {
        type: DataTypes.BOOLEAN,
      },
      noConfirmation: {
        type: DataTypes.INTEGER,
      },
      isBlocked: {
        type: DataTypes.BOOLEAN,
      },
      isPublic: {
        type: DataTypes.BOOLEAN,
      },
      Roles_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
