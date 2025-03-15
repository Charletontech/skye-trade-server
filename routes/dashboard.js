const express = require("express");
const multerUpload = require("../middleware/multerFileUpload");
const { protect } = require("../middleware/auth");
const {
  me,
  purchasePlan,
  withdrawalRequest,
  uploadReceipt,
} = require("../controllers/dashboard");
const { purchasePlanObj } = require("../validators/dashboard");

const router = express.Router();

router.get("/me", protect, multerUpload.single("files"), me);
router.post("/purchase-plan", protect, purchasePlanObj, purchasePlan);
router.post("/withdrawal-request", withdrawalRequest);

router.post(
  "/upload-receipt",
  protect,
  multerUpload.single("file"),
  uploadReceipt
);

module.exports = router;
