const express = require("express");
const cors = require("cors");

// Crear el servidor
const app = express();

// habilitar cors
app.use(cors());

// puerto de la app
const port = process.env.PORT || 8080;

//Arrancamos APP
app.listen(port, "0.0.0.0", () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`);
});
