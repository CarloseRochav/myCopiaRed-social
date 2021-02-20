//Definicion de modelo Usuario
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    name: DataTypes.STRING,
    picture: DataTypes.STRING,
    birth: DataTypes.DATE,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    adress: DataTypes.STRING,
    roll: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};