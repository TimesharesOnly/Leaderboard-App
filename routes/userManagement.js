const express = require('express');
const { getAllUsers, updateUser } = require('../controllers/userManagement');
const { protectAdmin } = require('../middleware/auth');

const router = express.Router();

router.route('/users').get( protectAdmin, getAllUsers);
router.route('/users/:id').put( protectAdmin, updateUser);

module.exports = router;
