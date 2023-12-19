const User = require("../models/User");
const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
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

    req.user = user;
    next();
  } catch (error) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'Admin') {
    next();
  } else {
    return next(new ErrorResponse('Not authorized as admin', 403));
  }
};

module.exports = { protect };
