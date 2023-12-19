const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

// List all users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

// Update a user
exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// Additional functions like deleteUser can be added here
