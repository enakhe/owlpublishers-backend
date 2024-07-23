const mongoose = require('mongoose');

const ArticleSchema = mongoose.Schema({

    title: {
        type: String,
        require: [true, "Please provide a title"]
    },

    description: {
        type: String,
        require: [true, "Please provide a description"]
    },

    body: {
        type: String,
        require: [true, "Please provide a content"]
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Articles', ArticleSchema);