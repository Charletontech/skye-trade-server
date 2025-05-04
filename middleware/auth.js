const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const bcrypt = require("bcryptjs");

// Protect routes
// AUTHENTICATION BY COOKIE
exports.protect = async (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token) {
    return next(new ErrorResponse("No token, access denied", 401));
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("Token verification failed:", err.message);
      return next(new ErrorResponse("Invalid or expired token", 401));
    }

    req.user = decoded;
    next();
  });
};

// protect admin
exports.admin = async (req, res, next) => {
  const token = req.cookies.adminToken;

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

// AUTHENTICATION BY BEARER TOKEN
exports.authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new ErrorResponse("No token, access denied", 401));
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("Token verification failed:", err.message);
      return next(new ErrorResponse("Invalid or expired token", 401));
    }

    req.user = decoded;
    next();
  });
};

exports.authenticateAdmin = async (req, res, next) => {
  const token = req.header.authorization;
  console.log(token);
  if (!token) {
    return next(new ErrorResponse("No token, access denied", 401));
  }

  // Verify the token
  jwt.verify(token, process.env.ADMIN_JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(new ErrorResponse("Invalid or expired token", 401));
    }

    req.admin = decoded;
    next();
  });
};
