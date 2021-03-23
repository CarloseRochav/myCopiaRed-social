const express = require("express");
const router = express.Router();
const { authController } = require("../controllers");
const { authMiddleware } = require("../middlewares");

router.post("/signup", authController.signUp);

router.post("/signin", authController.signIn);

router.get("/verify/:code", authController.verifyUser);

router.get(
  "/account/recovery",
  authMiddleware,
  authController.sendRecoveryPassword
);

router.get(
  "/account/changePassword",
  authMiddleware,
  authController.changePassword
);

module.exports = router;
