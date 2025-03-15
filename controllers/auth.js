const { register, login } = require("../services/auth");

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
