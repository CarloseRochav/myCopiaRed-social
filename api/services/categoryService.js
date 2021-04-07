const { Category } = require("../models");
const { customError } = require("../helpers");

exports.getCategories = async () => {
  const categories = await Category.findAll();
  if (!categories || !categories.length) {
    throw customError(404, "No hay categorias en la base de datos.");
  }
  return categories;
};

exports.createCategory = async (_name) => {
  await Category.create({
    name: _name,
  });
};

exports.destroyCategory = async (_id) => {
  await Category.destroy({ where: { id: _id } });
};

exports.categoryExist = async (_id) => {
  const categoryId = parseInt(_id);
  const category = await Category.findOne({
    where: { id: categoryId ? categoryId : -10 },
  });
  if (!category) {
    throw customError(404, "El usuario no existe.");
  }
  return category;
};
