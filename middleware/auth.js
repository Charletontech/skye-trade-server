const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const bcrypt = require("bcryptjs");

// Protect routes
exports.protect = async (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token) {
    return next(new ErrorResponse("No token, access denied", 401));
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(new ErrorResponse("Invalid or expired token", 401));
    }

    req.user = decoded;
    next();
  });
};

// protect admin
exports.admin = async (req, res, next) => {
  const token = req.cookies.adminToken;
  console.log(req.cookies.adminToken);

  if (!token) {
    return next(new ErrorResponse("No token, access denied", 401));
  }

  // Verify the token
  jwt.verify(token, process.env.ADMIN_JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(new ErrorResponse("Invalid or expired token", 401));
    }

    req.user = decoded;
    next();
  });
};
