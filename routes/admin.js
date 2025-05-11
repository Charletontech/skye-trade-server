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
} = require("../controllers/admin");
const editTradeObj = require("../validators/admin/editTradeObj");
const editUserObj = require("../validators/admin/editUserObj");

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

module.exports = router;
