const express = require("express");
const cors = require("cors");
const sequelize = require("./sequelize/models/index");
const bodyParser = require('body-parser');//Importo bodyParser
const {User} = require('./sequelize/models/user');//Importar modelo 

// Crear el servidor
const app = express();

//Uso de bodyP
app.use(bodyParser.urlencoded({extended:false}))//parse application/x-www-form-urlenconded
app.use(bodyParser.json());//parse applicarion/json

// habilitar cors
app.use(cors());

// Ruta a lista de Perfiles de Usuario ; GET
app.get('/usuarios',(req,res)=>{  
  res.send("GET / perfil")
})

// Ruta para crear un nuevo usuario ; POST
app.post('/usuarios/nuevo',(req,res)=>{
  //console.log(req.body);
   User.create(req.body
  {
    name:req.body.name,
    picture:req.body.picture,
    birth:req.body.birth,
    email:req.body.email,
    phone:req.body.phone,
    adress:req.body.adress,
    roll:req.body.roll,    
  }
  ).then(usuario=>{
    res.send("POST / usuarios/nuevo");
  }).catch(err=>{console.log("ERROR AL GUARDAR DATOS")});
})

// Ruta a un perfil mediante su id ; GET
app.post('/usuarios/:id',(req,res)=>{
  res.send("/usuarios/:id");
})

// Ruta para actualizar datos de un usuario ; PUT
app.put('/usuarios:id',(req,res)=>{
  res.send("/usuarios/:id");
})

// Ruta para eliminar usuario ; DELETE
app.delete('/usuarios:id',(req,res)=>{
  res.send('/usuarios/:id')
})



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
