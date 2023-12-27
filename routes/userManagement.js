const express = require('express');
const { getAllUsers, updateUser, createUser, deleteUser } = require('../controllers/userManagement');
const { protectAdmin } = require('../middleware/auth');

const router = express.Router();

router.route('/users')
  .get(protectAdmin, getAllUsers)
  .post(protectAdmin, createUser);

router.route('/users/:id')
  .put(protectAdmin, updateUser)
  .delete(protectAdmin, deleteUser);

module.exports = router;
