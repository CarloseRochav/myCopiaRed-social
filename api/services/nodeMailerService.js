const { transporter } = require("../../config/nodeMailerConfig/development");
const { NODE_MAILER_EMAIL } = require("../../config/enviromentVars");

exports.sendConfirmEmail = async (userEmail, randomNumber) => {
  await transporter.sendMail({
    from: NODE_MAILER_EMAIL,
    to: userEmail,
    subject: "Confirmar Cuenta",
    html: `<b>Codigo</b>
      <p> Tu codigo de activacion es: ${randomNumber} </b>`,
  });
};

exports.sendChangePassword = async (userEmail, newPassword) => {
  await transporter.sendMail({
    from: NODE_MAILER_EMAIL,
    to: userEmail,
    subject: "new password",
    html: `<b>Code</b>
      <p> Your new password is: ${newPassword} </b>`,
  });
};

exports.sendRecoveryPassword = async (userEmail, newPassword) => {
  await transporter.sendMail({
    from: NODE_MAILER_EMAIL,
    to: userEmail,
    subject: "recovery password",
    html: `<b>Code</b>
      <p> Your new password is: ${newPassword} </b>`,
  });
};
