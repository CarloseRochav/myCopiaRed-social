const AWS = require("aws-sdk");
const { User, Post } = require("../models");
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
      res.status(500).json({ code: 500, message: error });
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
  });

  res
    .status(201)
    .json({ code: 201, message: "Se ha actualizado la imagen de perfil" });
};

exports.uploadVideo = async (req, fileType, buffer, res, id) => {
  const params = {
    Bucket: awsConfig.bucket,
    Key: `${uuidv4()}.${fileType}`,
    Body: buffer,
  };

  s3.upload(params, async (error, data) => {
    if (error) {
      res.status(500).json({ code: 500, message: error });
    }
    const { Location } = data;
    await Post.create({
      title: req.body.title,
      description: req.body.description,
      video: Location,
      User_id: id,
    });
  });
};

exports.updateImageBackgroundProfile = async (fileType, buffer, _id, res) => {
  const params = {
    Bucket: awsConfig.bucket,
    Key: `${uuidv4()}.${fileType}`,
    Body: buffer,
  };

  s3.upload(params, async (error, data) => {
    if (error) {
      res.status(500).json({ code: 500, message: error });
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
  });

  res
    .status(201)
    .json({ code: 201, message: "Se ha actualizado la imagen de fondo" });
};
