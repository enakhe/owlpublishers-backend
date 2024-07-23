const mongoose = require('mongoose');

const CodeSchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        unique: true
    },

    code: {
        type: String,
        required: true,
        unique: true
    },

    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 300
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Code', CodeSchema);