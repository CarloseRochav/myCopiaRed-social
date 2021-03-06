const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser"); //Import bodyParser
const { sequelize } = require("./api/models");
const { userRoutes, authRoutes } = require("./api/routes"); //Import Routes

// Crear el servidor
const app = express();

//Uso de bodyP
app.use(bodyParser.urlencoded({ extended: false })); //parse application/x-www-form-urlenconded
app.use(bodyParser.json()); //parse applicarion/json

// habilitar cors
app.use(cors());

// puerto de la app
const port = process.env.PORT || 8080;

// Importar rutas
app.use(authRoutes);
app.use(userRoutes);

//Arrancamos APP
app.listen(port, "0.0.0.0", () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`);

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
