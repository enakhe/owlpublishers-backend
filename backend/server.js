const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');

const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5003;
const app = express();

// Connect to DB;
connectDB();

// Middleware for JSON body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes Middleware
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/articles', require('./routes/articleRoutes'));

// Middleware for error handling
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));


module.exports = app;