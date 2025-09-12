const express = require("express");
const multerUpload = require("../middleware/multerFileUpload");
const { authenticateAdmin } = require("../middleware/auth");
const {
  allUsers,
  editTrade,
  allTrades,
  allKyc,
  editKyc,
  editUser,
  manageWithdrawalRequest,
  withdrawalRequests,
  taxCodes,
  generateTaxCode,
  emailService,
  deleteAccount,
  updateUserStatus,
  getDepositProofs,
} = require("../controllers/admin");
const editTradeObj = require("../validators/admin/editTradeObj");
const editUserObj = require("../validators/admin/editUserObj");
const emailObj = require("../validators/admin/emailObj");
const updateUserStatusObj = require("../validators/admin/updateUserStatusObj");

const router = express.Router();

router.get("/all-users", authenticateAdmin, allUsers);
router.put("/edit-user/:userId", authenticateAdmin, editUserObj, editUser);
router.get("/all-trades", authenticateAdmin, allTrades);
router.put("/edit-trade/:tradeId", authenticateAdmin, editTradeObj, editTrade);
router.get("/all-kyc", authenticateAdmin, allKyc);
router.put("/edit-kyc/:kycId", authenticateAdmin, editKyc);
router.get("/withdrawal-requests", authenticateAdmin, withdrawalRequests);
router.put(
  "/manage-withdrawal-request/:withdrawalId",
  authenticateAdmin,
  manageWithdrawalRequest
);
router.get("/generate-tax-code", authenticateAdmin, generateTaxCode);
router.get("/tax-codes", authenticateAdmin, taxCodes);
router.post("/email-service", authenticateAdmin, emailObj, emailService);
router.delete("/delete-account/:userId", authenticateAdmin, deleteAccount);
router.get("/get-deposit-proofs", authenticateAdmin, getDepositProofs);

// This route ws not later used
// router.put(
//   "/update-user-status/:userId",
//   authenticateAdmin,
//   updateUserStatusObj,
//   updateUserStatus
// );

module.exports = router;
