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
} = require("./api/routes"); //Import Routes
const { transporter } = require("./config/nodeMailerConfig/development");

// Crear el servidor
const app = express();

//Uso de bodyP
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// habilitar cors
app.use(cors());

// puerto de la app
const port = process.env.PORT || 8080;

// Importar rutas
app.use(authRoutes);
app.use(userRoutes);
app.use(postRoutes);
app.use(commentRoutes);
app.use(reaccionRoutes);
app.use(interfacesRoutes);
app.use(categoryRoutes);

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
