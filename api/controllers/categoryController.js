const { formatError, formatMessage } = require("../helpers");
const { Category, User } = require("../models");

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json({ code: 200, message: categories });
  } catch (error) {
    res.status(500).send("An error has occurred with the server.");
  }
};

exports.createCategories = async (req, res) => {
  const { user } = req.user;
  const { id } = user;
  try {
    const userExist = await User.findByPk(id);
    if (!userExist) {
      throw res
        .status(404)
        .json({ code: 404, message: "El usuario no existe" });
    }

    await Category.create({
      name: req.body.name,
    });

    res
      .status(200)
      .json({ code: 200, message: "Categoria creada exitosamente" });
  } catch (error) {
    res.status(500).json({ code: 500, message: error });
  }
};

exports.deleteCategory = async (req, res) => {
  const { user } = req.user;
  const { id } = user;
  const categoryId = req.params.id;

  try {
    const userExist = await User.findByPk(id);
    const categoryExist = await Category.findByPk(categoryId);
    if (!userExist) {
      throw res
        .status(404)
        .json({ code: 404, message: "El usuario no existe" });
    }
    if (!categoryExist) {
      throw res
        .status(404)
        .json({ code: 404, message: "La categoria no existe" });
    }
    await Category.destroy({ where: { id: categoryId } });
    res
      .status(200)
      .json({ code: 200, message: "La categoria ha sido borrada" });
  } catch (error) {
    res.status(500).json({ code: 500, message: error });
  }
};
