const express = require("express");
const router = express.Router();

const { interfaceController } = require("../controllers");
const { authMiddleware, uploadMiddleware } = require("../middlewares");

router.get("/interface", interfaceController.getInterface);
router.put(
  "/interface",
  authMiddleware,
  uploadMiddleware,
  interfaceController.updateInterface
);

module.exports = router;
