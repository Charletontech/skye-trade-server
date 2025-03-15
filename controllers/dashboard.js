const { me, purchasePlan } = require("../services/dashboard");
const uploadReceipt = require("../services/dashboard/uploadReceipt.service");
const withdrawalRequest = require("../services/dashboard/withdrawalRequest.service");

exports.me = async (req, res, next) => {
  const responseObj = await me(req, res, next);
  const prepare = {
    success: true,
    data: responseObj,
  };
  res.status(200).json(prepare);
};

exports.purchasePlan = async (req, res, next) => {
  const responseObj = await purchasePlan(req, res, next);
  const prepare = {
    success: true,
    data: responseObj,
  };
  res.status(200).json(prepare);
};

exports.withdrawalRequest = async (req, res, next) => {
  const responseObj = await withdrawalRequest(req, res, next);
  const prepare = {
    success: true,
    data: responseObj,
  };
  res.status(200).json(prepare);
};

exports.uploadReceipt = async (req, res, next) => {
  const responseObj = await uploadReceipt(req, next);
  const prepare = {
    success: true,
    data: responseObj,
  };
  res.status(200).json(prepare);
};
