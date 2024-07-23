const asyncHandler = require('express-async-handler');
const Article = require('../models/articleModel');

// @description Create article
// @route POST /api/articles
// @access Private
const createArticles = asyncHandler(async (req, res) => {
    // Destructure the request body object
    const { title, description, body } = req.body;

    // Check for empty fields
    if (!title || !description || !body) {
        res.status(400);
        throw new Error(`Please add all fields`);
    } else if (title === '' || description === '' || body === '') {
        res.status(400);
        throw new Error(`Please add all fields`);
    }

    // Create an article object to the database
    const article = Article.create({
        title,
        description,
        body,
        userId: req.user._id,
    });

    // Validate creation
    if(!article) {
        res.status(400);
        throw new Error(`Something unexpected happened`);
    }

    // Return a status code of with a json object of the content created
    res.status(201).json({ 
        title: title,
        description: description,
        body: body,
        userId: req.user._id,
    });
});

// @description Read articles
// @route GET /api/articles
// @access Private
const getArticles = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Get Articles" });
});

// @description Update article
// @route PUT /api/articles
// @access Private
const updateArticle = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update Article ${req.params.id}` });
});

// @description Delete article
// @route Delete /api/articles
// @access Private
const deleteArticle = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete Article ${req.params.id}` });
});

module.exports = {
    createArticles,
    getArticles,
    updateArticle,
    deleteArticle
}