const express = require("express");
const cors = require("cors");
const { sequelize,Role } = require("./api/models");
const {
  userRoutes,
  authRoutes,
  postRoutes,
  interfacesRoutes,
  categoryRoutes,
  commentRoutes,
  reaccionRoutes,
  googleRoutes
} = require("./api/routes"); //Import Routes
const { transporter } = require("./config/nodeMailerConfig/development");

// Crear el servidor
const app = express();

//Passport y google
//require('./api/middlewares/oauthPassportMiddleware');
const passport = require('passport');
const session= require('express-session');
app.use(session({secret:"cats"}));
app.use(passport.initialize());
app.use(passport.session());
// <- Configuraciones necesarias para que confusione google oauth ; Initialize -Index principal


//Uso de bodyParser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// const session = require('express-session');
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(session({secret:"cats"}));

// habilitar cors
app.use(cors());

// puerto de la apps
const port = process.env.PORT || 8080;

// Importar rutas
app.use(authRoutes);
app.use(userRoutes);
app.use(postRoutes);
app.use(commentRoutes);
app.use(reaccionRoutes);
app.use(interfacesRoutes);
app.use(categoryRoutes);
app.use(googleRoutes);

//Arrancamos APP
app.listen(port, "0.0.0.0", () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`);

  //Verificamos que este listo para enviar correos.
  transporter
    .verify()
    .then(() => {
      console.log("Listo para enviar correos");
    })
    .catch((error) => {
      console.log("Hay un problema con el correo del servidor" + error);
    });
  // Contectandose a la base de datos
  sequelize
    .sync({ force: false }) //Sincroniza el modelo con la base de datos false || true
    .then(() => {
      console.log("Conectado a la base de datos");
    })
    .catch((error) => {
      console.log("No se ha conectado a la base de datos" + error);
    });
});


// Role.create({
//   name:"Comun",
//   description:"Usuario Normal"
// });