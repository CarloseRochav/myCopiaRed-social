const nodemailer = require("nodemailer");

const {
  NODE_MAILER_EMAIL,
  NODE_MAILER_PASSWORD,
} = require("../enviromentVars");

exports.transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: NODE_MAILER_EMAIL,
    pass: NODE_MAILER_PASSWORD,
  },
});
