const Sequelize = require("sequelize");
const { DB } = require("../../config/dbConfig/development");

const sequelize = new Sequelize(DB.database, DB.username, DB.password, {
  host: DB.host,
  dialect: "postgres",
});

module.exports = sequelize;
