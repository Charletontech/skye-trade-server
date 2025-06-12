const forgotPassword = require("./forgotPassword.service");
const login = require("./login.service");
const register = require("./register.service");

module.exports = {
  register,
  login,
  forgotPassword,
};
