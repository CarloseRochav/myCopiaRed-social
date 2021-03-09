const nodeMailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "anastasia.wolff70@ethereal.email", // generated ethereal user
      pass: "aFUGT2HpWZ5HavG9Yc", // generated ethereal password
    },
  });

  const mailOptions ={
    from: '"Equipo de Back-end 👻" <api@example.com>', // sender address
    to: "cerv.powerful@gmail.com", // list of receivers
    subject: "Registro exitoso ✔", // Subject line
    text: "Bienvenido!!", // plain text body
    html: "<b>Hello world?</b>", // html body
  }

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions,(error,info)=>{
    if (error){
        res.status(500).send(error.message);
    }
    else{
        console.log("Email enviado");
        res.status(200).json(req.body);
    }
  });
