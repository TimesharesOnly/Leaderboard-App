const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const imageController = require('../controllers/image');
const { deleteImage } = require('../controllers/image');


router.post('/delete', deleteImage);
router.post('/upload', upload, imageController.uploadImage);

module.exports = router;
