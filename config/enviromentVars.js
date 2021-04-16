if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_Secret: process.env.JWT_Secret,
  AWS_BUCKET: process.env.AWS_BUCKET,
  AWS_USER: process.env.AWS_USER,
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  NODE_MAILER_EMAIL: process.env.NODE_MAILER_EMAIL,
  NODE_MAILER_PASSWORD: process.env.NODE_MAILER_PASSWORD,
  GOOGLE_CLIENT:process.env.GOOGLE_CLIENTID,
  GOOGLE_SECRET_KEY:process.env.GOOGLE_SECRET_KEY
};
