const User = require("../models/User");
const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");

const protect = async (req, res, next, isAdminCheck = false) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.id);

    if (!user) {
      return next(new ErrorResponse("No user found", 404));
    }

    if (isAdminCheck && user.role !== 'Admin') {
      return next(new ErrorResponse('Access denied: Admin only', 403));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
};

exports.protect = protect;
exports.protectAdmin = (req, res, next) => protect(req, res, next, true);
