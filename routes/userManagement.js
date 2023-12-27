const express = require('express');
const { getAllUsers, updateUser, createUser } = require('../controllers/userManagement');
const { protectAdmin } = require('../middleware/auth');

const router = express.Router();

router.route('/users')
  .get(protectAdmin, getAllUsers)
  .post(protectAdmin, createUser);

router.route('/users/:id')
  .put(protectAdmin, updateUser);

module.exports = router;
