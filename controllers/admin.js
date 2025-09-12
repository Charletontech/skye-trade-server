const allUsers = require("../services/admin/allUsers.service");
const {
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
} = require("../services/admin");

exports.allUsers = async (req, res, next) => {
  const responseObj = await allUsers(req, next);
  const prepare = {
    success: true,
    data: responseObj,
  };
  res.status(200).json(prepare);
};

exports.editTrade = async (req, res, next) => {
  const responseObj = await editTrade(req, next);
  const prepare = {
    success: true,
    data: responseObj,
  };
  res.status(200).json(prepare);
};

exports.allTrades = async (req, res, next) => {
  const responseObj = await allTrades(req, next);
  const prepare = {
    success: true,
    data: responseObj,
  };
  res.status(200).json(prepare);
};

exports.allKyc = async (req, res, next) => {
  const responseObj = await allKyc(req, next);
  const prepare = {
    success: true,
    data: responseObj,
  };
  res.status(200).json(prepare);
};

exports.editKyc = async (req, res, next) => {
  const responseObj = await editKyc(req, next);
  const prepare = {
    success: true,
    data: responseObj,
  };
  res.status(200).json(prepare);
};

exports.editUser = async (req, res, next) => {
  const responseObj = await editUser(req, next);
  const prepare = {
    success: true,
    data: responseObj,
  };
  res.status(200).json(prepare);
};

exports.withdrawalRequests = async (req, res, next) => {
  const responseObj = await withdrawalRequests(req, next);
  const prepare = {
    success: true,
    data: responseObj,
  };
  res.status(200).json(prepare);
};

exports.manageWithdrawalRequest = async (req, res, next) => {
  const responseObj = await manageWithdrawalRequest(req, next);
  const prepare = {
    success: true,
    data: responseObj,
  };
  res.status(200).json(prepare);
};

exports.taxCodes = async (req, res, next) => {
  const responseObj = await taxCodes(req, next);
  const prepare = {
    success: true,
    data: responseObj,
  };
  res.status(200).json(prepare);
};

exports.generateTaxCode = async (req, res, next) => {
  const responseObj = await generateTaxCode(req, next);
  const prepare = {
    success: true,
    data: responseObj,
  };
  res.status(200).json(prepare);
};

exports.emailService = async (req, res, next) => {
  const responseObj = await emailService(req, next);
  const prepare = {
    success: true,
    data: responseObj,
  };
  res.status(200).json(prepare);
};

exports.deleteAccount = async (req, res, next) => {
  const responseObj = await deleteAccount(req, next);
  const prepare = {
    success: true,
    data: responseObj,
  };
  res.status(200).json(prepare);
};

exports.updateUserStatus = async (req, res, next) => {
  const responseObj = await updateUserStatus(req, next);
  const prepare = {
    success: true,
    data: responseObj,
  };
  res.status(200).json(prepare);
};

exports.getDepositProofs = async (req, res, next) => {
  const responseObj = await getDepositProofs(req, next);
  const prepare = {
    success: true,
    data: responseObj,
  };
  res.status(200).json(prepare);
};
