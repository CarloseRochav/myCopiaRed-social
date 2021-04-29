const express = require("express");
const router = express.Router();
const { reaccionsController } = require("../controllers");
const { authMiddleware } = require("../middlewares");

router.get("/reaccion", authMiddleware, reaccionsController.getReaccions);

router.post(
  "/reaccion/:id",
  authMiddleware,
  reaccionsController.createReaccions
);

router.get(
  "/reaccion/:id",
  authMiddleware,
  reaccionsController.getReaccionsByPost
);

router.get(
  "/reaccionsis",
  authMiddleware,
  reaccionsController.getReaccionsByUser
);

router.post(
  "/reaccion/:id",
  authMiddleware,
  reaccionsController.createReaccions
);

router.delete(
  "/reaccion/:id",
  authMiddleware,
  reaccionsController.deleteReaccions
);

module.exports = router;
