const nodemailer = require("nodemailer");
const {google} = require("googleapis");
const {GOOGLE_OAUTH_ID,GOOGLE_OAUTH_KEY,GOOGLE_URI,GOOGLE_REFRESH}=require("../enviromentVars");//Credenciales de servicio de google


    const GOOGLE_ID="557172398110-mei2do1n6ace3u625kc9gjvmogoa13ei.apps.googleusercontent.com"
    const GOOGLE_SECRET="aSmihEkP4gh8upNBlEFr2NIG"
    const GOOGLE_TOKEN="1//04GNqRq3hYIPzCgYIARAAGAQSNwF-L9IryXGbLGjrjdPT826W-nATwSt02g9wZ8azGnin-0qMunxQFWuJqy-S7etntSgc3Z_FbGk"
    const GOOGLE_uri="https://developers.google.com/oauthplayground"

    const oAuth2Client = new google.auth.OAuth2(
      GOOGLE_ID,
      GOOGLE_SECRET,
      GOOGLE_uri
    );

oAuth2Client.setCredentials({refresh_token:GOOGLE_TOKEN});


// exports.transporterNew=async ()=>{
  
//   const accessToken = await oAuth2Client.getAccessToken()//Generacion de token

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth:{
//         type:'OAuth2',
//         user:"backend.team.hacka@gmail.com",
//         clientId:GOOGLE_ID,
//         clientSecret:GOOGLE_SECRET,
//         refresh_token:GOOGLE_TOKEN,
//         accessToken: accessToken,
//     }, 
//   });

//   return transporter;

// }

const accessToken = oAuth2Client.getAccessToken()//Generacion de token

exports.transporterNew = nodemailer.createTransport({
  service: "gmail",
  auth:{
      type:'OAuth2',
      user:"backend.team.hacka@gmail.com",
      clientId:GOOGLE_ID,
      clientSecret:GOOGLE_SECRET,
      refresh_token:GOOGLE_TOKEN,
      accessToken: accessToken,
  }, 
});




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
    pass: NODE_MAILER_PASSWORD,
  },
});

