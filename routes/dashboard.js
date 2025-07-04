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
} = require("../controllers/dashboard");
const {
  newTradeObj,
  withdrawalRequestObj,
  changePasswordObj,
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

module.exports = router;
