const { categoryService, userService } = require("../services");

exports.getCategories = async (req, res) => {
  try {
    const categories = await categoryService.getCategories();
    return res.status(200).json({ code: 200, msg: categories });
  } catch (error) {
    return res
      .status(error.code ? error.code : 500)
      .json(
        error.message ? { code: 500, msg: error.errors[0].message } : error
      );
  }
};

exports.createCategories = async (req, res) => {
  const { user } = req.user;
  const { id } = user;
  try {
    await userService.userExist(id);
    await categoryService.createCategory(req.body.name);

    return res
      .status(200)
      .json({ code: 200, msg: "Categoria creada exitosamente" });
  } catch (error) {
    return res
      .status(error.code ? error.code : 500)
      .json(
        error.message ? { code: 500, msg: error.errors[0].message } : error
      );
  }
};

exports.deleteCategory = async (req, res) => {
  const { user } = req.user;
  const { id } = user;
  const categoryId = req.params.id;

  try {
    await userService.userExist(id);
    await categoryService.categoryExist(categoryId);
    await categoryService.destroyCategory(categoryId);
    return res
      .status(200)
      .json({ code: 200, msg: "Categoria borrada exitosamente" });
  } catch (error) {
    return res
      .status(error.code ? error.code : 500)
      .json(
        error.message ? { code: 500, msg: error.errors[0].message } : error
      );
  }
};
