const { transporter } = require("../../config/nodeMailerConfig/development");
const { NODE_MAILER_EMAIL } = require("../../config/enviromentVars");

exports.sendConfirmEmail = async (res, userEmail, randomNumber) => {
  try {
    await transporter.sendMail({
      from: NODE_MAILER_EMAIL,
      to: userEmail,
      subject: "Confirm Account",
      html: `<b>Code</b>
      <p> Your activate code is: ${randomNumber} </b>`,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ code: 400, message: "Hubo un error al enviar el correo" });
  }
};

exports.sendChangePassword = async (res, userEmail, newPassword) => {
  try {
    await transporter.sendMail({
      from: NODE_MAILER_EMAIL,
      to: userEmail,
      subject: "new password",
      html: `<b>Code</b>
      <p> Your new password is: ${newPassword} </b>`,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ code: 400, message: "Hubo un error al enviar el correo" });
  }
};

exports.sendRecoveryPassword = async (res, userEmail, newPassword) => {
  try {
    await transporter.sendMail({
      from: NODE_MAILER_EMAIL,
      to: userEmail,
      subject: "recovery password",
      html: `<b>Code</b>
      <p> Your new password is: ${newPassword} </b>`,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ code: 400, message: "Hubo un error al enviar el correo" });
  }
};
