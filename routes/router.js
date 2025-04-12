const express = require("express");
const router = express.Router();
const {
  signUpHandler,
  refreshHandler,
  webhookHandler,
  loginHandler,
  initiatePayment,
  verifyPayment,
  getAccess,
  getBalance,
  ninValidation,
  suspendedNin,
  dataModification,
} = require("../controllers/controller");

// public routes
router.post("/signup", signUpHandler);
router.post("/login", loginHandler);
router.post("/initiate-payment", initiatePayment);
router.post("/verify-payment", verifyPayment);
router.get("/get-access", getAccess);
router.get("/get-balance", getBalance);
router.post("/nin-validation", ninValidation);
router.post("/suspended-nin", suspendedNin);
router.post("/data-modification", dataModification);
router.get("/refresh-server", refreshHandler);
router.post("/webhook", webhookHandler);

module.exports = router;
