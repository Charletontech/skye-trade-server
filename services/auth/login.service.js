const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user.model");
const { Op } = require("sequelize");
const ErrorResponse = require("../../utils/errorResponse");

const login = async (req, res, next) => {
  try {
    const { identifier, password } = req.body;

    // check if its an admin login
    if (identifier === process.env.ADMIN_MAIL) {
      const correctAdminPass = handleAdminLogin();
      if (correctAdminPass) {
        const token = jwt.sign(
          { id: process.env.ADMIN_MAIL },
          process.env.ADMIN_JWT_SECRET,
          { expiresIn: "3h" }
        );

        // res.cookie("adminToken", token, {
        //   httpOnly: true,
        //   secure: process.env.NODE_ENV === "production",
        //   maxAge: 2 * 60 * 60 * 1000,
        //   domain: "localhost",
        //   sameSite: "None",
        // });

        return {
          permission: "admin",
          token,
        };
      } else {
        throw next(new ErrorResponse("Invalid credentials", 400));
      }
    }

    function handleAdminLogin() {
      if (password !== process.env.ADMIN_PASS) {
        return false;
      }
      return true;
    }

    // handle ordinary user login if not admin
    const userExists = await User.findOne({
      where: {
        [Op.or]: [
          { email: identifier }, // Check if the email exists
          { username: identifier }, // Check if the username exists
        ],
      },
    });

    if (!userExists) {
      throw next(new ErrorResponse("Invalid credentials", 400));
    }

    // check user status
    if (userExists.status !== "approved") {
      message =
        userExists.status === "pending"
          ? "Your registration is yet to be approved"
          : "Your account has been rejected";
      throw next(new ErrorResponse(message, 403));
    }

    const isMatch = await bcrypt.compare(password, userExists.password);
    if (!isMatch) {
      throw next(new ErrorResponse("Invalid credentials", 400));
    }

    const token = jwt.sign(
      { id: userExists.userId, email: userExists.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    // res.cookie("authToken", token, {
    //   httpOnly: true,
    //   sameSite: "None",
    //   secure: process.env.NODE_ENV === "production",
    //   maxAge: 2 * 60 * 60 * 1000,
    // });

    return {
      permission: "user",
      token,
    };
  } catch (err) {
    throw next(new ErrorResponse(err?.message?.replace(/[\\"]/gi, ""), 500));
  }
};

module.exports = login;
