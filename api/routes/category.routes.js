const express = require("express");
const router = express.Router();

const { categoryController } = require("../controllers");
const { authMiddleware, uploadMiddleware } = require("../middlewares");

router.get("/categorias", categoryController.getCategories);
router.post(
  "/categorias",
  authMiddleware,
  uploadMiddleware,
  categoryController.createCategories
);
router.delete(
  "/categorias/:id",
  authMiddleware,
  categoryController.deleteCategory
);

module.exports = router;
