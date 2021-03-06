if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DB_UserName: process.env.DB_UserName,
  DB_Password: process.env.DB_Password,
  DB_DataBase: process.env.DB_DataBase,
  DB_Host: process.env.DB_Host,
  JWT_Secret: process.env.JWT_Secret,
};
