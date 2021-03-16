const { transporter } = require("../../config/nodeMailerConfig/development");
const { NODE_MAILER_EMAIL } = require("../../config/enviromentVars");

exports.sendEmail = async (userEmail, randomNumber) => {
  try {
    await transporter.sendMail({
      from: NODE_MAILER_EMAIL,
      to: userEmail,
      subject: "forgot password",
      html: `<b>Code</b>
      <p> Your activate code is: ${randomNumber} </b>
      <p> You can click this link: https://damp-beyond-72658.herokuapp.com/verify/${randomNumber}`,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ code: 400, msg: "Hubo un error al enviar el correo" });
  }
};
