const { Categories } = require("../../database/models");
const { customError } = require("../helpers");

exports.getCategories = async () => {
  const categories = await Categories.findAll();
  if (!categories || !categories.length) {
    throw customError(404, "No hay categorias en la base de datos.");
  }
  return categories;
};

exports.createCategories = async (_name, locale) => {
  await Categories.create({
    name: _name,
    picture: locale,
  });
};

exports.destroyCategories = async (_id) => {
  await Categories.destroy({ where: { id: _id } });
};

exports.categoryExist = async (_id) => {
  const categoryId = parseInt(_id);
  const category = await Categories.findOne({
    where: { id: categoryId ? categoryId : -10 },
  });
  if (!category) {
    throw customError(404, "La categoria no existe.");
  }
  return category;
};
