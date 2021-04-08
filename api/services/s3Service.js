const AWS = require("aws-sdk");
const { User, Post,Gallery } = require("../models");
const { v4: uuidv4 } = require("uuid");
const awsConfig = require("../../config/awsConfig/development");
const { customError } = require("../helpers");

const s3 = new AWS.S3({
  accessKeyId: awsConfig.accessKey,
  secretAccessKey: awsConfig.secretAccessKey,
});

exports.updateImageProfile = async (fileType, buffer, _id) => {
  const params = {
    Bucket: awsConfig.bucket,
    Key: `${uuidv4()}.${fileType}`,
    Body: buffer,
  };

  s3.upload(params, async (error, data) => {
    if (error) {
      throw customError(500, error);
    }
    const { Location } = data;

    await User.update(     
      { picture: Location },
      {
        where: {
          id: _id,
        },
      }     
    );
    
    await Gallery.create(
      {
        pathResource:Location,
        User_id:_id,
        keyResource:params.Key
      }
    )
    
        
  });
};

exports.updateImageBackgroundProfile = async (fileType, buffer, _id) => {
  const params = {
    Bucket: awsConfig.bucket,
    Key: `${uuidv4()}.${fileType}`,
    Body: buffer,
  };

  s3.upload(params, async (error, data) => {
    if (error) {
      throw customError(500, error);
    }
    const { Location } = data;
    await Post.create({
      title: req.body.title,
      description: req.body.description,
      video: Location,
      thumbnail: Localtion,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      User_id: id,
    });
    await Gallery.create(
      {
        mediaResource:Location,
        User_id:id,


      }
    )
  });
};

exports.uploadVideo = async (body, fileType, buffer, id) => {
  const params = {
    Bucket: awsConfig.bucket,
    Key: `${uuidv4()}.${fileType}`,
    Body: buffer,
  };

  s3.upload(params, async (error, data) => {
    if (error) {
      throw customError(500, error);
    }
    const { Location } = data;

    await User.update(
      { backgroundpicture: Location },
      {
        where: {
          id: _id,
        },
      }
    );

    await Gallery.create(
      {
        mediaResource:Location,
        User_id:_id
      }
    )
    await Post.create({
      title: body.title,
      description: body.description,
      video: Location,
      thumbnail: Location,
      latitude: body.latitude ? body.latitude : "11111",
      longitude: body.latitude ? body.latitude : "6666",
      User_id: id,
    });
  });
};

//Obetener listas de objetos
exports.getObject=async(key)=>{
  const params={
    Bucket:awsConfig.bucket,
    Key:key
  }

  s3.getObject(params,(err,data)=>{
    
      if(err){
        console.log("Hay un error : "+err);       
    }
    else{
      // fs.writeFile("Imagen_desde_s3.mp4",data.Body,'binary',(err)=>{
      //   if(err) throw err
      //   console.log("imagen descargada");
      // })
      console.log(data.Body);
    }
  });
}

//Obetener todos los objetos del bucket
exports.getAllObjects=async()=>{

  let params ={
    Bucket:awsConfig.bucket
  }

  s3.listObjectsV2(params,(err,data)=>{
    if(err){
      console.log("Tenemos un  error ");
      throw err
    }
    else{
      console.log(data);
    }
  })
}

//Eliminar un objeto
exports.deleteImageOrVideo= async(key)=>{
  const params={
    Bucket:awsConfig.bucket,
    Key:key
  }

  s3.deleteObject(params,(err,data)=>{

    if(err){
      console.log(" Error al procesar : ");
      throw err;
    }
    else{
      console.log(`El ${data} se ha eliminado satisfacctoriamente`);
    }
  })
  
}