const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({

    firstName: {
        type: String,
        require: [true, 'Provide a first name']
    },

    lastName: {
        type: String,
        require: [true, 'Provide a first name']
    },

    email: {
        type: String,
        require: [true, 'Provide a email'],
        unique: true
    },

    phoneNumber: {
        type: String,
        require: [false]
    },

    country: {
        type: String,
        require: [false]
    },

    address: {
        type: String,
        require: [false]
    },

    profilePicture: {
        type: String,
        require: [false]
    },

    password: {
        type: String,
        require: [true, 'Provide a password']
    },

    verify: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);