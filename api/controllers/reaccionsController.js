const { Post, User, Comments, Reaccions } = require("../models");

exports.getReaccions = async (req, res) => {
    try{
        const reacciont = await Postlikes.findAll();
        res.status(200).send(reacciont);
    }catch (error) {
        res.status(500).send("An error has ocurred whit the server.");
    }
};

exports.createReaccions = async (req, res) => {
    const { user } = req.user;
    const { id } = user; 
    const userExist = await User.findByPk(id);
  
    const postId = req.body.idPost;
    const postExist = await Post.findByPk(postId);
    

    try {
        if(!userExist){
            throw res.status(404).send("Usuario no existe")
          }
          if(!postExist){
            throw res.status(404).send("Publicación no existe")
          }
          if(!commentExist){
            throw res.status(404).send("Comentario no existe")
          }
          await Reaccions.create({
              reaccion: req.body.reaccion,
          });
          res.status(201).send("Reaccion creada");
    }catch (error) {
        res.status(500).send(error);
    }
};

exports.getReaccionsById = async (req, res) => {
    const reaccionId = req.params.id;
    try {
        const reaccion = await Reaccions.findOne({ where: {id: reaccionId} });
        res.status(200).send(reaccion);
    }catch (error) {
        res.status(500).send("An error has ocurred whit the server.");
    }
};


exports.updateReaccions = async (req, res) => {
    const { user } = req.user;
    const { id } = user; 
    const userExist = await User.findByPk(id);
  
    const postId = req.body.idPost;
    const postExist = await Post.findByPk(postId);
    
    const reacciontId = req.params.id
    const newReaccions = req.body;
    const reaccionsExist = await Reaccions.findByPk(reacciontId);

    try {
        if(!userExist){
            throw res.status(404).send("Usuario no existe")
          }
          if(!postExist){
            throw res.status(404).send("Publicación no existe")
          }
          if(!reaccionsExist){
            throw res.status(404).send("Comentario no existe")
          }
          const reaccion = await Reaccions.findOne({where: {id: reaccionId, User_id: id}})
          if(!reaccion) {
              throw res.status(400).send("Reaccion incorrecta");
          }
          await Reaccions.uptade( newReaccions );
          res.status(200).send("Reaccion data has been update");
    }catch (error) {
        res.status(500).send("An error has ocurred with teh server.");
    }
};

exports.deleteReaccions = async (req, res) => { 
const { user } = req.user;
const { id } = user; 
const userExist = await User.findByPk(id);

const postId = req.body.idPost;
const postExist = await Post.findByPk(postId);

const reacciontId = req.params.id
const reaccionsExist = await Reaccions.findByPk(reacciontId);

try {
    if(!userExist){
        throw res.status(404).send("Usuario no existe")
      }
      if(!postExist){
        throw res.status(404).send("Publicación no existe")
      }
      if(!reaccionsExist){
        throw res.status(404).send("Comentario no existe")
      }
      await Reaccions.destroy({where: {id: reacciontId, User_id: id} });
      res.status(200).send("Reaccion has been deleted.");
}catch(error){
    res.status(500).send("error");
}

};