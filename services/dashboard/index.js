const changePassword = require("./changePassword.service");
const checkKycStatus = require("./checkKycStatus.service");
const editProfile = require("./editProfile.service");
const kyc = require("./kyc.service");
const me = require("./me.service");
const newTrade = require("./newTrade.service");
const verifyTaxCode = require("./verifyTaxCode.service");
const withdrawalRequest = require("./withdrawalRequest.service");

module.exports = {
  me,
  newTrade,
  kyc,
  checkKycStatus,
  verifyTaxCode,
  withdrawalRequest,
  editProfile,
  changePassword,
};
