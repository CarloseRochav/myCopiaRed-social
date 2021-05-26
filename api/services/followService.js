const { Followers } = require("../../database/models");
const { customError } = require("../helpers");

//Usuario Siguiendo a otro
exports.followToUser = async (idFollower, idFollowing) => {
  if (idFollower === idFollowing) {
    customError(500, "No te puede seguir a ti mismo");
  }
  const siguiendo = await Followers.findOne({
    where: {
      Users_id: idFollower,
      UserFollowed_id: idFollowing,
    },
  });
  if (siguiendo) {
    customError(500, "Ya se esta siguiendo a ese usuario");
  }
  await Followers.create({
    Users_id: idFollower,
    UserFollowed_id: idFollowing,
  });
};

//Usuario Dejando de Seguir a otro
exports.deleteFollowToUser = async (idFollower, idFollowing) => {
  if (idFollower === idFollowing) {
    customError(500, "No puedes dejarte de  seguir a ti mismo");
  }
  const siguiendo = await Followers.findOne({
    where: {
      Users_id: idFollower,
      UserFollowed_id: idFollowing,
    },
  });
  if (!siguiendo) {
    customError(500, "No  estas siguiendo a ese usuario");
  }
  await Followers.destroy({
    where: {
      Users_id: idFollower,
      UserFollowed_id: idFollowing,
    },
  });
};

//Total de Seguidores de un usuario
exports.totalCountFollowers = async (idFollowing) => {
  const totalCount = await Followers.findAndCountAll({
    where: {
      UserFollowed_id: idFollowing,
    },
  });
  if (!totalCount) {
    throw customError(200, "No tiene seguidores");
  }
  return totalCount;
};

exports.totalCountMyFollowers = async (idFollowing) => {
  const totalCount = await Followers.findAndCountAll({
    where: {
      Users_id: idFollowing,
    },
  });
  if (!totalCount) {
    throw customError(200, "No tiene seguidores");
  }
  return totalCount;
};

//Ver todos los Seguidores de un usuario
exports.allFollowers = async (idFollowing) => {
  const totalFollowers = await Followers.count({
    where: {
      UserFollowed_id: idFollowing,
    },
  });
  if (!totalFollowers) {
    throw customError(200, "No tiene seguidores");
  }
  return totalFollowers;
};

exports.iAmFollow = async (idFollower, idFollowing) => {
  const siguiendo = await Followers.findOne({
    where: {
      Users_id: idFollower,
      UserFollowed_id: idFollowing,
    },
  });
  if (siguiendo) {
    return true;
  }
  return false;
};
