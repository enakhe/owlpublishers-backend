const express = require('express');
const { registerUser, loginUser, verifyEmail, getVerificationCode, personalInfo } = require('../controllers/userControlller');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// Register route [POST]
router.post('/', registerUser);

// Login / Authenticate route [POST]
router.post('/login', loginUser);

// Vefity email adddress route [POST]
router.post('/verify-email', protect, verifyEmail);

// Vefity email adddress route [POST]
router.post('/get-code', protect, getVerificationCode);

// Vefity email adddress route [POST]
router.post('/personal-info', protect, personalInfo);

module.exports = router;