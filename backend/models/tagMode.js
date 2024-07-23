const mongoose = require('mongoose');

const TagSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please provide a tag name"]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Tag', TagSchema);