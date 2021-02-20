const express = require("express");
const cors = require("cors");
const sequelize = require("./sequelize/models/index");

// Crear el servidor
const app = express();

// habilitar cors
app.use(cors());

// puerto de la app
const port = process.env.PORT || 8080;

//Arrancamos APP
app.listen(port, "0.0.0.0", () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`);

  // Contectandose a la base de datos
  sequelize
    .sync({ force: false })
    .then(() => {
      console.log("Conectado a la base de datos");
    })
    .catch((error) => {
      console.log("No se ha conectado a la base de datos");
    });
});
