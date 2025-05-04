const bcrypt = require("bcryptjs");
const User = require("../../models/user.model");
const ErrorResponse = require("../../utils/errorResponse");
const { Op } = require("sequelize");

const register = async (req, next) => {
  try {
    const {
      fullName,
      email,
      username,
      phone,
      gender,
      accountType,
      country,
      currency,
      zipCode,
      password,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if user already exists
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [
          { email }, // Check if the email exists
          { username }, // Check if the username exists
        ],
      },
    });

    if (existingUser) {
      throw next(new ErrorResponse("Username or Email already exists", 400));
    }

    // add user to database
    const newUser = await User.create(
      {
        fullName,
        email,
        username,
        phone,
        gender,
        accountType,
        country,
        currency,
        zipCode,
        password: hashedPassword,
      },
      { raw: true }
    );

    if (newUser) {
      return `Registration for ${username} successful!`;
    }

    // return newUser;
  } catch (err) {
    throw next(new ErrorResponse(err?.message?.replace(/[\\"]/gi, ""), 500));
  }
};

module.exports = register;
