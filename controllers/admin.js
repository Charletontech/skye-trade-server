const allFundWalletRequests = require("../services/admin/allFundWalletRequests.service");
const allPlans = require("../services/admin/allPlans.service");
const allUsers = require("../services/admin/allUsers.service");
const allWithdrawalRequests = require("../services/admin/allWithdrawalRequests.service");
const editUserBalance = require("../services/admin/editUserBalance.service");
const updateFundWalletStatus = require("../services/admin/updateFundWalletStatus.service");
const updateWithdrawalStatus = require("../services/admin/updateWithdrawalStatus.service");

exports.allUsers = async (req, res, next) => {
  const responseObj = await allUsers(req, next);
  const prepare = {
    success: true,
    data: responseObj,
  };
  res.status(200).json(prepare);
};

exports.allPlans = async (req, res, next) => {
  const responseObj = await allPlans(req, next);
  const prepare = {
    success: true,
    data: responseObj,
  };
  res.status(200).json(prepare);
};
exports.allWithdrawalRequests = async (req, res, next) => {
  const responseObj = await allWithdrawalRequests(req, next);
  const prepare = {
    success: true,
    data: responseObj,
  };
  res.status(200).json(prepare);
};

exports.allFundWalletRequests = async (req, res, next) => {
  const responseObj = await allFundWalletRequests(req, next);
  const prepare = {
    success: true,
    data: responseObj,
  };
  res.status(200).json(prepare);
};

exports.editUserBalance = async (req, res, next) => {
  const responseObj = await editUserBalance(req, next);
  const prepare = {
    success: true,
    data: responseObj,
  };
  res.status(200).json(prepare);
};

exports.updateWithdrawalStatus = async (req, res, next) => {
  const responseObj = await updateWithdrawalStatus(req, next);
  const prepare = {
    success: true,
    data: responseObj,
  };
  res.status(200).json(prepare);
};

exports.updateFundWalletStatus = async (req, res, next) => {
  const responseObj = await updateFundWalletStatus(req, next);
  const prepare = {
    success: true,
    data: responseObj,
  };
  res.status(200).json(prepare);
};
