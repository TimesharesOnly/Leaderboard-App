const express = require('express');
const { getAllUsers, updateUser } = require('../controllers/userManagement');
const { protect, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.route('/users').get(protect, isAdmin, getAllUsers);
router.route('/users/:id').put(protect, isAdmin, updateUser);

module.exports = router;
