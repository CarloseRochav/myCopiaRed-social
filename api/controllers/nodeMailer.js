const nodemailer = require('nodemailer');
require('dotenv').config();
//Para entorno de variables

//Transporter Step 1
let transporter = nodemailer.createTransport({ 
	service: 'gmail', 
	auth: {
		user:process.env.EMAIL,//process.env.EMAIL, 
		pass:process.env.PASS//process.env.PASS
		}
	});

//Step 2
let mailOptions = { 
	from:'rochavawave@gmail.com' , 
	to:'playamouth@gmail.com', 
	subject: 'Prueba de envio', 
	text: 'Hola Bienvenido'
};

//Step 3
// const mail= await ransporter.sendMail(mailOptions,function(err,data){//Guardo en una variable para ejecutar en otra parte
// 	if(err){
// 		console.log(`Ha ocurriod un error de tipo ${err}`);
// 	}
// 	else{
// 		console.log("Email enviado de manera satisfactoria");
// 	}
// });

//module.exports=sendEmail; //Exportar esta funcion para usu futuro
module.exports={
  transporter,mailOptions
}