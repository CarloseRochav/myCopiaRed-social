if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_Secret: process.env.JWT_Secret,
};
