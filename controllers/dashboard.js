const { me, newTrade, kyc, checkKycStatus } = require("../services/dashboard");
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
