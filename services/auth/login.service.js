const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user.model");
const ErrorResponse = require("../../utils/errorResponse");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // check if its an admin login
    if (email === process.env.ADMIN_MAIL) {
      var response;
      const correctAdminPass = handleAdminLogin();
      if (correctAdminPass) {
        const token = jwt.sign(
          { email: process.env.ADMIN_MAIL },
          process.env.ADMIN_JWT_SECRET,
          { expiresIn: "2h" }
        );

        res.cookie("adminToken", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 2 * 60 * 60 * 1000,
          domain: "localhost",
          sameSite: "None",
        });

        response = "Admin login successful!";
      } else {
        throw next(new ErrorResponse("Invalid credentials", 401));
      }
      return response;
    }

    function handleAdminLogin() {
      if (password !== process.env.ADMIN_PASS) {
        return false;
      }
      return true;
    }

    // handle ordinary user login if not admin
    const userExists = await User.findOne({ where: { email } });

    if (!userExists) {
      throw next(new ErrorResponse("Invalid credentials", 401));
    }

    const isMatch = await bcrypt.compare(password, userExists.password);
    if (!isMatch) {
      throw next(new ErrorResponse("Invalid credentials", 401));
    }

    const token = jwt.sign(
      { id: userExists.id, email: userExists.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 2 * 60 * 60 * 1000,
    });

    return "Login successful!";
  } catch (err) {
    throw next(new ErrorResponse(err?.message?.replace(/[\\"]/gi, ""), 500));
  }
};

module.exports = login;
