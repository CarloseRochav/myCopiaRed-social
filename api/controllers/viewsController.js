const { UsersViews } = require("../../database/models");

exports.addView = async (req, res) => {
  const { user } = req.user;
  const { id } = user;
  const idPost = req.params.id;
  try {
    await UsersViews.create({
      Posts_id: idPost,
      Users_id: id,
    });

    return res.status(200).json({ code: 200, msg: "Vista Agregada" });
  } catch (error) {
    return res
      .status(error.code ? error.code : 500)
      .json(error.message ? { code: 500, msg: error.message } : error);
  }
};
