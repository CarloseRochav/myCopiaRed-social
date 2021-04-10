const { JWT_Secret } = require("./enviromentVars");


module.exports = {
  secret: JWT_Secret,
  expires: "24h",
  rounds: 10,
};
