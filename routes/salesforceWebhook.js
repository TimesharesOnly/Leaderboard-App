const express = require('express');
const router = express.Router();
const { handleSalesforceWebhook } = require('../controllers/salesforceWebhookController');

router.post('/', handleSalesforceWebhook);

module.exports = router;
