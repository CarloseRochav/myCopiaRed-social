const express = require("express");
const router = express.Router();
const { viewRoutes } = require("../controllers");
const { authMiddleware } = require("../middlewares");

//Vista generada en una publicacion
router.post("/view/:id", authMiddleware, viewRoutes.addView);

module.exports = router;
