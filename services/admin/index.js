const allKyc = require("./allKyc.service");
const allTrades = require("./allTrades.service");
const editKyc = require("./editKyc.service");
const editTrade = require("./editTrade.service");
const editUser = require("./editUser.service");
const manageWithdrawalRequest = require("./manageWithdrawalRequest.service");

module.exports = {
  editTrade,
  allTrades,
  allKyc,
  editKyc,
  editUser,
  manageWithdrawalRequest,
};
