const AWS = require("aws-sdk");
const { User,Gallery } = require("../models");
const { v4: uuidv4 } = require("uuid");
const awsConfig = require("../../config/awsConfig/development");

const s3 = new AWS.S3({
  accessKeyId: awsConfig.accessKey,
  secretAccessKey: awsConfig.secretAccessKey,
});

exports.updateImageProfile = async (fileType, buffer, _id, res) => {
  const params = {
    Bucket: awsConfig.bucket,
    Key: `${uuidv4()}.${fileType}`,
    Body: buffer,
  };

  s3.upload(params, async (error, data) => {
    if (error) {
      res.status(500).send(error);
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
        mediaResource:Location,
        User_id:_id
      }
    )
    
        
  });

  res
    .status(201)
    .json({ code: 201, msg: "Se ha actualizado la imagen de perfil" });
};

//Creacion de metodo para cpnsulta de imagenes
