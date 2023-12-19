const express = require('express');
const { getAllUsers, updateUser } = require('../controllers/userManagement');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/users').get(protect, getAllUsers);
router.route('/users/:id').put(protect, updateUser);

module.exports = router;
