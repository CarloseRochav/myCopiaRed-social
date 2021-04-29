const {
  AWS_BUCKET,
  AWS_USER,
  AWS_ACCESS_KEY,
  AWS_SECRET_ACCESS_KEY,
} = require("../enviromentVars");

module.exports = {
  bucket: AWS_BUCKET,
  user: AWS_USER,
  accessKey: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
};
