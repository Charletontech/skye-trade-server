const bcrypt = require("bcryptjs");
const User = require("../../models/user.model");
const ErrorResponse = require("../../utils/errorResponse");

const register = async (req, next) => {
  try {
    const { fullName, email, password, country, wallet, walletType } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create(
      {
        fullName,
        email,
        password: hashedPassword,
        country,
        wallet,
        walletType,
      },
      { raw: true }
    );

    if (newUser) {
      return `Registration for ${email} successful`;
    }
    console.log(newUser);

    return newUser;
  } catch (err) {
    throw next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
};

module.exports = register;
