const { followService } = require("../services");

exports.postFollow = async (req, res) => {
  const { user } = req.user;
  const { id } = user;
  const idFollowing = req.params.id;
  try {
    followService.followToUser(id, idFollowing);
    return res
      .status(200)
      .json({ code: 200, msg: "Gracias por seguir a este usuario" });
  } catch (error) {
    return res
      .status(error.code ? error.code : 500)
      .json(error.message ? { code: 500, msg: error.message } : error);
  }
};

exports.deleteFollow = async (req, res) => {
  const { user } = req.user;
  const { id } = user;
  const idFollowing = req.params.id;
  try {
    followService.deleteFollowToUser(id, idFollowing);
    return res
      .status(200)
      .json({ code: 200, msg: "Has dejado de seguir a este usuario" });
  } catch (error) {
    return res
      .status(error.code ? error.code : 500)
      .json(error.message ? { code: 500, msg: error.message } : error);
  }
};

exports.totalCountFollowers = async (req, res) => {
  const { user } = req.user;
  const { id } = user;
  const idFollowing = req.params.id;
  try {
    const totalCount = followService.totalCountFollowers(idFollowing);
    return res.status(200).json({ code: 200, msg: totalCount });
  } catch (error) {
    return res
      .status(error.code ? error.code : 500)
      .json(error.message ? { code: 500, msg: error.message } : error);
  }
};

exports.totalFollowers = async (req, res) => {
  const { user } = req.user;
  const { id } = user;
  const idFollowing = req.params.id;
  try {
    const totalFollowers = followService.allFollowers(idFollowing);
    return res.status(200).json({ code: 200, msg: totalFollowers });
  } catch (error) {
    return res
      .status(error.code ? error.code : 500)
      .json(error.message ? { code: 500, msg: error.message } : error);
  }
};
