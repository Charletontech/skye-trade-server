const allKyc = require("./allKyc.service");
const allTrades = require("./allTrades.service");
const editKyc = require("./editKyc.service");
const editTrade = require("./editTrade.service");
const editUser = require("./editUser.service");
const withdrawalRequests = require("./withdrawalRequests.service");
const manageWithdrawalRequest = require("./manageWithdrawalRequest.service");
const taxCodes = require("./taxCodes.service");
const generateTaxCode = require("./generateTaxCode.service");

module.exports = {
  editTrade,
  allTrades,
  allKyc,
  editKyc,
  editUser,
  withdrawalRequests,
  manageWithdrawalRequest,
  generateTaxCode,
  taxCodes,
};
