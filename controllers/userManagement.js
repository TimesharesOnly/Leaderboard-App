const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const bcrypt = require('bcryptjs');

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


// Create a new user (by admin)
exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password, role, youtubeVideoId, profilePic } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return next(new ErrorResponse("User already exists", 400));
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    // Create the user
    const newUser = await User.create({
      name,
      email,
      password,
      role,
      youtubeVideoId,
      profilePic
    });

    // Exclude password in the response
    newUser.password = undefined;

    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    next(error);
  }
};


// Delete a user
exports.deleteUser = async (req, res, next) => {
  try {
      const user = await User.findByIdAndDelete(req.params.id);

      if (!user) {
          return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
      }

      res.status(200).json({ success: true, data: {} });
  } catch (error) {
      next(error);
  }
};



// Additional functions like deleteUser can be added here
