const AWS = require("aws-sdk");
const { User } = require("../models");
const { v4: uuidv4 } = require("uuid");
const awsConfig = require("../../config/awsConfig/development");

const s3 = new AWS.S3({
  accessKeyId: awsConfig.accessKey,
  secretAccessKey: awsConfig.secretAccessKey,
});

exports.updateProfileUser = async (req, res) => {
  const { user } = req.user;
  const { id: _id } = user;
  let myFile = req.file.originalname.split(".");
  const fileType = myFile[myFile.length - 1];
  let location;

  const params = {
    Bucket: awsConfig.bucket,
    Key: `${uuidv4()}.${fileType}`,
    Body: req.file.buffer,
  };

  s3.upload(params, async (error, data) => {
    if (error) {
      res.status(500).send(error);
    }
    const { Location } = data;
    location = Location;

    await User.update(
      { picture: location },
      {
        where: {
          id: _id,
        },
      }
    );
  });

  res.status(200).send("yey");
};
