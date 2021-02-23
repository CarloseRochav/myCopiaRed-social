const express = require("express");
const cors = require("cors");
const sequelize = require("./sequelize/models/index");
const bodyParser = require("body-parser"); //Importo bodyParser
const User = require("./sequelize/models/User"); //Importar modelo

// Crear el servidor
const app = express();

//Uso de bodyP
app.use(bodyParser.urlencoded({ extended: false })); //parse application/x-www-form-urlenconded
app.use(bodyParser.json()); //parse applicarion/json

// habilitar cors
app.use(cors());

// Ruta a lista de Perfiles de Usuario ; GET
app.get("/usuarios", (req, res) => {
  User.findAll()
    .then(
      (usuarios) => {
        console.log(usuarios), //Muestra en consola los usuarios
          res.send(usuarios);
      } //Envia usuarios registrados a a la vista}
    )
    .catch(console.log("Error al consultar usuarios"));
});

// Ruta para crear un nuevo usuario ; POST
app.post("/usuarios/nuevo", (req, res) => {
  //console.log(req.body);
  console.log(User);
  console.log(req.body);
  User.create({
    name: req.body.name,
    picture: req.body.picture,
    birth: req.body.birth,
    email: req.body.email,
    phone: req.body.phone,
    adress: req.body.adress,
    roll: req.body.roll,
  })
    .then((usuario) => {
      res.send("POST / usuarios/nuevo");
      console.log("INSERT SUCESSED");
    })
    .catch((err) => {
      console.log("ERROR AL GUARDAR DATOS");
    });
});

//Obtener usuario mediante id
app.get("/usuarios/:id", (req, res) => {
  let personaId = req.params.id;
  User.findOne({ where: { id: personaId } })
    .then((usuario) => {
      res.send(usuario);//Muestra en pantalla
      console.log(usuario);//muestra en consola
    })
    .catch(console.log("Error al consultar usuario"));
});

// Ruta a un perfil mediante su id ; GET
app.post("/usuarios/:id", (req, res) => {
  res.send("/usuarios/:id");
});

// Ruta para actualizar datos de un usuario ; PUT
app.put("/usuarios/:id", (req, res) => {
  let personaId = req.params.id
  let newUsuario=req.body;
  User.findOne({ where: { id: personaId } })
    .then(
      //res.send("Usuario Encontrado"),
      (usuario) => {
        usuario.update(newUsuario)
          .then(newUser=>{
            console.log("Usuario Actualizado"),
            res.json(newUser)
            })
          .catch(User=>{
            console.log("Fallo al Actualizar")
          })
    })
    .catch(console.log("Error al consultar usuario, no encontrado"));
      
});

// Ruta para eliminar usuario ; DELETE
app.delete("/usuarios/:id", (req, res) => {
  //res.send("/usuarios/:id");
    let usuarioId = req.params.id;
    User.destroy({where:{id:usuarioId}})
      .then(()=>{
          res.send("Usuario eliminado");
      })
});

// puerto de la app
const port = process.env.PORT || 8080;

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
      console.log("No se ha conectado a la base de datos");
    });
});
