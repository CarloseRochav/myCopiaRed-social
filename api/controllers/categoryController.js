const { categoryService, userService, s3Service } = require("../services");

exports.getCategories = async (req, res) => {
  try {
    const categories = await categoryService.getCategories();
    return res.status(200).json({ code: 200, msg: categories });
  } catch (error) {
    return res
      .status(error.code ? error.code : 500)
      .json(error.message ? { code: 500, msg: error.message } : error);
  }
};

exports.createCategories = async (req, res) => {
  const { user } = req.user;
  const { id } = user;

  const myFile = req.file.originalname.split(".");
  const fileType = myFile[myFile.length - 1];
  const buffer = req.file.buffer;

  try {
    await userService.userExist(id);
    await s3Service.uploadCategorieImage(
      req.body.name,
      req.body.description,
      fileType,
      buffer
    );
    return res
      .status(200)
      .json({ code: 200, msg: "Categoria creada exitosamente" });
  } catch (error) {
    return res
      .status(error.code ? error.code : 500)
      .json(error.message ? { code: 500, msg: error.message } : error);
  }
};

exports.deleteCategory = async (req, res) => {
  const { user } = req.user;
  const { id } = user;
  const categoryId = req.params.id;

  try {
    await userService.userExist(id);
    await categoryService.categoryExist(categoryId);
    await categoryService.destroyCategories(categoryId);
    return res
      .status(200)
      .json({ code: 200, msg: "Categoria borrada exitosamente" });
  } catch (error) {
    return res
      .status(error.code ? error.code : 500)
      .json(error.message ? { code: 500, msg: error.message } : error);
  }
};
