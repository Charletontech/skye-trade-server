const {
  me,
  newTrade,
  kyc,
  checkKycStatus,
  verifyTaxCode,
  withdrawalRequest,
  editProfile,
  changePassword,
  withdrawalHistory,
  uploadId,
  accountVerificationStatus,
} = require("../services/dashboard");
const getActiveTrade = require("../services/dashboard/getActiveTrade.service");

exports.me = async (req, res, next) => {
  const responseObj = await me(req, next);
  const prepare = {
    success: true,
    data: responseObj,
  };
  res.status(200).json(prepare);
};

exports.newTrade = async (req, res, next) => {
  const responseObj = await newTrade(req, next);
  const prepare = {
    success: true,
    data: responseObj,
  };
  res.status(200).json(prepare);
};

exports.getActiveTrade = async (req, res, next) => {
  const responseObj = await getActiveTrade(req, next);
  const prepare = {
    success: true,
    data: responseObj,
  };
  res.status(200).json(prepare);
};

exports.kyc = async (req, res, next) => {
  const responseObj = await kyc(req, next);
  const prepare = {
    success: true,
    data: responseObj,
  };
  res.status(200).json(prepare);
};

exports.checkKycStatus = async (req, res, next) => {
  const responseObj = await checkKycStatus(req, next);
  const prepare = {
    success: true,
    data: responseObj,
  };
  res.status(200).json(prepare);
};

exports.verifyTaxCode = async (req, res, next) => {
  const responseObj = await verifyTaxCode(req, next);
  const prepare = {
    success: true,
    data: responseObj,
  };
  res.status(200).json(prepare);
};

exports.withdrawalRequest = async (req, res, next) => {
  const responseObj = await withdrawalRequest(req, next);
  const prepare = {
    success: true,
    data: responseObj,
  };
  res.status(200).json(prepare);
};

exports.editProfile = async (req, res, next) => {
  const responseObj = await editProfile(req, next);
  const prepare = {
    success: true,
    data: responseObj,
  };
  res.status(200).json(prepare);
};

exports.changePassword = async (req, res, next) => {
  const responseObj = await changePassword(req, next);
  const prepare = {
    success: true,
    data: responseObj,
  };
  res.status(200).json(prepare);
};

exports.withdrawalHistory = async (req, res, next) => {
  const responseObj = await withdrawalHistory(req, next);
  const prepare = {
    success: true,
    data: responseObj,
  };
  res.status(200).json(prepare);
};

exports.uploadId = async (req, res, next) => {
  const responseObj = await uploadId(req, next);
  const prepare = {
    success: true,
    data: responseObj,
  };
  res.status(200).json(prepare);
};

exports.accountVerificationStatus = async (req, res, next) => {
  const responseObj = await accountVerificationStatus(req, next);
  const prepare = {
    success: true,
    data: responseObj,
  };
  res.status(200).json(prepare);
};
