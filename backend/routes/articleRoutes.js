const express = require('express');
const { createArticles, getArticles, updateArticle, deleteArticle } = require('../controllers/articleControllers');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// Post & Get Route [CREATE & READ]
router.route('/').post(protect, createArticles).get(getArticles);

// Put & Delete Route [UPDATE & DELETE]
router.route('/:id').put(updateArticle).delete(deleteArticle);


module.exports = router;