const express = require("express");
const cors = require("cors");
const { sequelize } = require("./database/models/index");
const {
  userRoutes,
  authRoutes,
  postRoutes,
  interfacesRoutes,
  categoryRoutes,
  commentRoutes,
  reaccionRoutes,
  googleRoutes,
  fbRoutes,
  followerRoutes,
  viewRoutes,
} = require("./api/routes"); //Import Routes
const { transporter,transporterNew } = require("./config/nodeMailerConfig/development");

// Crear el servidor
const app = express();

//Passport y google
//require('./api/middlewares/oauthPassportMiddleware');
const passport = require("passport");
const session = require("express-session");
app.use(session({ secret: "cats" }));
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
app.use(fbRoutes);
app.use(followerRoutes);
app.use(viewRoutes);

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
    .authenticate()
    .then(() => {
      console.log("Conectado a la base de datos.");
    })
    .catch((err) => {
      console.error("No es posible conectarse a la base de datos:", err);
    });
});

// Role.create({
//   name:"Comun",
//   description:"Usuario Normal"
// });
