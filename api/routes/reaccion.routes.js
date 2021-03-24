const express = require("express");
const router = express.Router();
const { reaccionsController } = require("../controllers");
const { authMiddleware } = require("../middlewares");

router.get("/reaccion", authMiddleware, reaccionsController.getReaccions);

router.post("/reaccions", authMiddleware, reaccionsController.createReaccions);

router.get("/reaccion/:id", authMiddleware, reaccionsController.getReaccionsById);

router.put("/reaccion/:id", authMiddleware, reaccionsController.updateReaccions);

router.delete("/reaccion/:id", authMiddleware, reaccionsController.deleteReaccions);
  



module.exports = router;