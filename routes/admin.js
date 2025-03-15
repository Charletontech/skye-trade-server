const express = require("express");
const multerUpload = require("../middleware/multerFileUpload");
const { admin } = require("../middleware/auth");
const {
  allUsers,
  allPlans,
  allWithdrawalRequests,
  allFundWalletRequests,
  editUserBalance,
  updateWithdrawalStatus,
  updateFundWalletStatus,
} = require("../controllers/admin");

const router = express.Router();

router.get("/all-users", allUsers);
router.get("/all-plans", allPlans);
router.get("/all-withdrawal-requests", allWithdrawalRequests);
router.get("/all-fund-wallet-requests", allFundWalletRequests);
router.post("/edit-user-balance", editUserBalance);
router.post("/update-withdrawal-status", updateWithdrawalStatus);
router.post("/update-fund-wallet-status", updateFundWalletStatus);

module.exports = router;
