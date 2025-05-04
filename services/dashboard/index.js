const checkKycStatus = require("./checkKycStatus.service");
const kyc = require("./kyc.service");
const me = require("./me.service");
const newTrade = require("./newTrade.service");

module.exports = {
  me,
  newTrade,
  kyc,
  checkKycStatus,
};
