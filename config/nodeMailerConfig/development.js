const nodemailer = require("nodemailer");
const {google} = require("googleapis");
const {GOOGLE_OAUTH_ID,GOOGLE_OAUTH_KEY,GOOGLE_PASS_APP}=require("../enviromentVars");//Credenciales de servicio de google

//Configuracion actual

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
    pass: GOOGLE_PASS_APP,
  },
});

