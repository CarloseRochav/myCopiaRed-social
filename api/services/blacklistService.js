const { Blacklist } = require("../../database/models");
const { customError } = require("../helpers");

exports.findBlockUser = async (_idOne, _idTwo) => {
  const idOne = parseInt(_idOne);
  const idTwo = parseInt(_idTwo);
  const userBlock = await Blacklist.findOne({
    where: {
      User_id: idOne ? idOne : -10,
      UserBlocked_id: idTwo ? idTwo : -10,
    },
  });

  if (userBlock) {
    throw customError(505, "El Usuario ya esta bloqueado");
  }
  return userBlock;
};

exports.compareTwoIds = async (_idOne, _idTwo) => {
  const idOne = parseInt(_idOne);
  const idTwo = parseInt(_idTwo);
  if (idOne === idTwo) {
    throw customError(500, "El usuario es el mismo");
  }
  return { idOne: idOne, idTwo: idTwo };
};

exports.addToBlacklist = async (blockerId, blockedId) => {
  await Blacklist.create({
    User_id: blockerId,
    UserBlocked_id: parseInt(blockedId),
  });
  return { blockerId: blockerId, blockedId: blockedId };
};
