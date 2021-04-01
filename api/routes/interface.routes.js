const express = require("express");
const router = express.Router();

const { interfaceController } = require("../controllers");
const { authMiddleware } = require("../middlewares");

router.get("/interface", interfaceController.getInterface);
router.post("/interface", authMiddleware, interfaceController.createInterface);
router.put("/interface", authMiddleware, interfaceController.updateInterface);

module.exports = router;
