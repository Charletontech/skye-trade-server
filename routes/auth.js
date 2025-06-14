const express = require("express");
const {
  register,
  login,
  forgotPassword,
  changePassword,
  resetPasswordWithOtp,
} = require("../controllers/auth");
const { validateRegisterObj, validateLoginObj } = require("../validators/auth");
const multerUpload = require("../middleware/multerFileUpload");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post(
  "/register",
  // multerUpload.single("files"),
  validateRegisterObj,
  register
);
router.post(
  "/login",
  // multerUpload.single("files"),
  validateLoginObj,
  login
);
router.post("/forgot-password", forgotPassword);
router.post("/change-password", changePassword);
router.post("/reset-password", resetPasswordWithOtp);
module.exports = router;
