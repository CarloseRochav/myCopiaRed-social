const express = require("express");
const router = express.Router();
const { reaccionsController } = require("../controllers");
const { authMiddleware } = require("../middlewares");

router.get("/reaccion", authMiddleware, reaccionsController.getReaccions);

router.post(
  "/reaccions/:idpost",
  authMiddleware,
  reaccionsController.createReaccions
);

router.delete(
  "/reaccion/:idreaccions",
  authMiddleware,
  reaccionsController.deleteReaccions
);

module.exports = router;
