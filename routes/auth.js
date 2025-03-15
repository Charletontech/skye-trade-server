const express = require("express");
const { register, login } = require("../controllers/auth");
const { validateRegisterObj, validateLoginObj } = require("../validators/auth");
const multerUpload = require("../middleware/multerFileUpload");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post(
  "/register",
  multerUpload.single("files"),
  validateRegisterObj,
  register
);
router.post("/login", multerUpload.single("files"), validateLoginObj, login);

module.exports = router;
