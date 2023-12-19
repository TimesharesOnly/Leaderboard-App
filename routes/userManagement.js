const express = require('express');
const { getAllUsers, updateUser } = require('../controllers/userManagement');
const { protect, protectAdmin } = require('../middleware/auth');

const router = express.Router();

router.route('/users').get(protect, protectAdmin, getAllUsers);
router.route('/users/:id').put(protect, protectAdmin, updateUser);

module.exports = router;
