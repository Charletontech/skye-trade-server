const changePassword = require("./changePassword.service");
const forgotPassword = require("./forgotPassword.service");
const login = require("./login.service");
const register = require("./register.service");
const resetPasswordWithOtp = require("./resetPasswordWithOtp.service");

module.exports = {
  register,
  login,
  forgotPassword,
  changePassword,
  resetPasswordWithOtp,
};
