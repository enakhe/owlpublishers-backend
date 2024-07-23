const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const Code = require('../models/codeModel');
const EmailService = require('../services/emailService');
const crypto = require('crypto');
const emailService = require('../services/emailService');

// @description Create users
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    // Destructure fields
    const { firstName, lastName, email, password } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !password) {
        res.status(400);
        throw new Error('Please add all required fields');
    } else if (firstName === '' || lastName === '' || email === '' || password === '') {
        res.status(400);
        throw new Error('Please add all required fields');
    };

    // Check if the user is already registered
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error(`User with the email ${email} already exits`);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a user
    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword
    });

    // Validate Creation
    if (user) {
        const code = await new Code({
            user: user._id,
            code: crypto.randomInt(10010, 900010)
        }).save();

        // await emailService(user.email, "Verify your email", code.code);

        res.status(201).json({
            _id: user.id,
            fullName: user.firstName.concat(' ', user.lastName),
            verify: user.verify,
            token: generateToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error(`Invalid user data`);
    };
});

// @description Login users
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {

    // Deconstruct fields
    const { email, password } = req.body;

    // Check for valid email
    const user = await User.findOne({ email });

    // Check for valid password
    if (user && (await bcrypt.compare(password, user.password))) {
        if (user.verify === false) {
            const code = await new Code({
                user: user._id,
                code: crypto.randomInt(10010, 900010)
            }).save();
        };
        res.status(201).json({
            _id: user.id,
            fullName: user.firstName.concat(' ', user.lastName),
            verify: user.verify,
            token: generateToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error(`Invalid credentials`);
    }
});


// @description Verify users
// @route POST /api/users/verify-email
// @access Public
const verifyEmail = asyncHandler(async (req, res) => {
    const { code } = req.body;
    if (!code) {
        res.status(400);
        throw new Error(`Please enter code`);
    }

    if (!req.user) {
        res.status(400);
        throw new Error(`Not authorized`);
    }

    const userId = req.user.id;

    const userCode = await Code.findOne({
        user: req.user.id,
    });

    if (!userCode) {
        res.status(400);
        throw new Error(`Invalid code ${code}`);
    }

    if (userCode.code === code) {
        await User.findByIdAndUpdate(userId, {
            verify: true
        });
        await Code.findByIdAndDelete(userCode.id);
        const updatedUser = await User.findById(userId);
        res.status(201).json({
            _id: updatedUser.id,
            fullName: updatedUser.firstName.concat(' ', updatedUser.lastName),
            verify: updatedUser.verify,
            token: generateToken(updatedUser._id)
        });
    } else {
        res.status(400);
        throw new Error(`Invalid code`);
    }
})

// @description Verify users
// @route POST /api/users/verify-email
// @access Public
const getVerificationCode = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error(`Not Authorized`);
    } else {
        await Code.findOneAndDelete({
            user: user.id
        })
        await new Code({
            user: user._id,
            code: crypto.randomInt(10010, 900010)
        }).save();
    }
    res.status(201).json({
        _id: user.id,
        fullName: user.firstName.concat(' ', user.lastName),
        verify: user.verify,
        token: generateToken(user._id)
    });
})
// @description Verify users
// @route POST /api/users/personal-info
// @access Public
const personalInfo = asyncHandler(async (req, res) => {
    const { phoneNumber, address, country } = req.body;
    if (!phoneNumber || !address || !country) {
        res.status(400);
        throw new Error(`Please enter all required fields`);
    }

    const user = await User.findById(req.user._id);
    if (!user) {
        res.status(404);
        throw new Error(`Not Authorized`);
    } else {
        await User.findByIdAndUpdate(req.user._id, {
            phoneNumber,
            country,
            address,
        });
        const updatedUser = await User.findById(req.user._id);
        res.status(200).json({
            _id: updatedUser.id,
            fullName: updatedUser.firstName.concat(' ', updatedUser.lastName),
            verify: updatedUser.verify,
            token: generateToken(updatedUser._id)
        });
    }
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

module.exports = {
    registerUser,
    loginUser,
    verifyEmail,
    getVerificationCode,
    personalInfo
}
