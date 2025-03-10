const express = require('express');
const { submitContactForm } = require('../controllers/contactController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/contact', authMiddleware, submitContactForm);

module.exports = router;
