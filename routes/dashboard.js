const express = require("express");
const multerUpload = require("../middleware/multerFileUpload");
const { authenticate } = require("../middleware/auth");
const {
  me,
  newTrade,
  getActiveTrade,
  kyc,
  checkKycStatus,
  verifyTaxCode,
  withdrawalRequest,
  editProfile,
  changePassword,
  withdrawalHistory,
  uploadId,
  accountVerificationStatus,
} = require("../controllers/dashboard");
const {
  newTradeObj,
  withdrawalRequestObj,
  changePasswordObj,
  uploadIdObj,
} = require("../validators/dashboard");

const router = express.Router();

router.get("/me", authenticate, me);
router.post("/new-trade", authenticate, newTradeObj, newTrade);
router.get("/get-active-trade", authenticate, getActiveTrade);
router.post(
  "/kyc",
  authenticate,
  multerUpload.fields([
    { name: "idFront", maxCount: 1 },
    { name: "idBack", maxCount: 1 },
  ]),
  kyc
);
router.get("/check-kyc-status", authenticate, checkKycStatus);
router.get("/verify-tax-code", authenticate, verifyTaxCode);
router.post(
  "/withdrawal-request",
  authenticate,
  withdrawalRequestObj,
  withdrawalRequest
);
router.post("/edit-profile", authenticate, multerUpload.none(), editProfile);
router.post(
  "/change-password",
  authenticate,
  multerUpload.none(),
  changePasswordObj,
  changePassword
);
router.get("/withdrawal-history", authenticate, withdrawalHistory);
router.post(
  "/upload-id",
  authenticate,
  multerUpload.fields([
    { name: "idFile", maxCount: 1, limit: 30 * 1024 * 1024 },
  ]),
  uploadIdObj,
  uploadId
);

router.get(
  "/account-verification-status",
  authenticate,
  accountVerificationStatus
);

module.exports = router;
