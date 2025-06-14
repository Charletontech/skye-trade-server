const {
  register,
  login,
  forgotPassword,
  changePassword,
  resetPasswordWithOtp,
} = require("../services/auth");

exports.register = async (req, res, next) => {
  const responseObj = await register(req, next);
  const prepare = {
    success: true,
    data: responseObj,
  };
  res.status(200).json(prepare);
};

exports.login = async (req, res, next) => {
  const responseObj = await login(req, res, next);
  const prepare = {
    success: true,
    data: responseObj,
  };
  res.status(200).json(prepare);
};

exports.forgotPassword = async (req, res, next) => {
  const responseObj = await forgotPassword(req, next);
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

exports.resetPasswordWithOtp = async (req, res, next) => {
  const responseObj = await resetPasswordWithOtp(req, next);
  const prepare = {
    success: true,
    data: responseObj,
  };
  res.status(200).json(prepare);
};
