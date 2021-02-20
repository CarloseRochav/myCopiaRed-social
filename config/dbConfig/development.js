const {
  DB_UserName,
  DB_Password,
  DB_DataBase,
  DB_Host,
} = require("../enviromentVars");

module.exports = {
  DB: {
    username: DB_UserName,
    password: DB_Password,
    database: DB_DataBase,
    host: DB_Host,
    dialect: "postgres",
  },
};
