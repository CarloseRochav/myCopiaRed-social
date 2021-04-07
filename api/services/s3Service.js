const AWS = require("aws-sdk");
const { User, Post } = require("../models");
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

    await User.update(
      { backgroundpicture: Location },
      {
        where: {
          id: _id,
        },
      }
    );
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
