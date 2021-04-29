const AWS = require("aws-sdk");
const {
  Users,
  Posts,
  Categories,
  Interfaces,
} = require("../../database/models");
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

    await Users.update(
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

    await Users.update(
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
    await Posts.create({
      title: body.title,
      description: body.description,
      video: Location,
      thumbnail: Location,
      latitude: body.latitude ? body.latitude : "11111",
      longitude: body.longitude ? body.longitude : "6666",
      Users_id: id,
      Categories_id: body.Categories_id ? body.Categories_id : 1,
      commentsCount: 0,
      reactionsCount: 0,
    });
  });
};

exports.uploadCategorieImage = async (name, description, fileType, buffer) => {
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
    await Categories.create({
      name: name,
      picture: Location,
      description: description,
    });
  });
};

exports.uploadLogo = async (interfaz, fileType, buffer) => {
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
    await Interfaces.update(
      {
        logo: Location,
        primaryColor: interfaz.primaryColor,
        secondaryColor: interfaz.secondaryColor,
      },
      {
        where: {
          id: 1,
        },
      }
    );
  });
};
